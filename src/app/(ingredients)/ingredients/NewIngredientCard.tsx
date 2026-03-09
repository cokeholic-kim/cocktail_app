import { useLoginContext } from '@/app/(context)/LoginContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface NewIngredientCardProps {
  handleClickNewIngredient: () => void;
  isLogin?: boolean;
  onRequestLogin?: () => void;
}

function NewIngredientCard({
  handleClickNewIngredient,
  isLogin,
  onRequestLogin,
}: NewIngredientCardProps) {
  const { isLogin: contextIsLogin } = useLoginContext();
  const router = useRouter();
  const resolvedIsLogin = isLogin ?? contextIsLogin;
  const requestLogin = onRequestLogin ?? (() => router.push('/login'));

  const handleClick = () => {
    if (resolvedIsLogin) {
      handleClickNewIngredient();
      return;
    }
    requestLogin();
  };

  return (
    <div
      className="md:w-1/4 w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      onClick={handleClick}
    >
      <div className="w-full h-44 mb-4 relative">
        <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
          <Image
            src="/assets/questionMark.png"
            alt="새 재료 카드"
            width={400}
            height={300}
            className="rounded-t-lg w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="mb-4">
        <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
          {resolvedIsLogin ? '새 재료를 등록하고 싶어요' : '로그인 후 이용 가능합니다'}
        </p>
      </div>
    </div>
  );
}

export default NewIngredientCard;
