FROM node:24-alpine AS base

# 필요한 시점에만 의존성 설치 단계를 사용
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 패키지 매니저 기준으로 의존성 설치
COPY package.json package-lock.json* ./
RUN npm ci

# 변경이 있을 때만 소스 빌드 수행
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 사용 통계를 수집할 수 있음 (익명)
# 비활성화가 필요하면 아래 환경변수 주석 해제
# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 실행용 이미지를 만들기 위해 빌드 결과를 복사해 Next 서버 실행 준비
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# 런타임에서도 Next.js 사용 통계 비활성화가 필요하면 주석 해제
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# 정적 렌더 캐시 디렉터리 권한 설정
RUN mkdir .next
RUN chown nextjs:nodejs .next

# output trace를 이용해 필요한 파일만 담아 이미지 크기 최적화
# (Next.js output 파일 추적 기능)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
