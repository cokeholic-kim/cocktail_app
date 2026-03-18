import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const OUTPUT_DIR = resolve(process.cwd(), "docs/security-reports");
const JSON_REPORT_PATH = resolve(OUTPUT_DIR, "security-audit-latest.json");
const MARKDOWN_REPORT_PATH = resolve(OUTPUT_DIR, "security-audit-latest.md");

function runAuditCommand() {
    try {
        const raw = execSync("npm audit --json --omit=dev", { encoding: "utf8" });
        return { raw, exitCode: 0 };
    } catch (error) {
        const stdout = (error.stdout && String(error.stdout)) || "{}";
        const exitCode = Number(error.status) || 1;
        return { raw: stdout, exitCode };
    }
}

function extractVulnerabilities(audit: unknown) {
    if (!audit || typeof audit !== "object" || !("vulnerabilities" in audit)) {
        return [];
    }

    const vulnerabilities = audit.vulnerabilities;
    if (!vulnerabilities || typeof vulnerabilities !== "object") {
        return [];
    }

    return Object.entries(vulnerabilities).map(([name, detail]) => {
        if (!detail || typeof detail !== "object") {
            return { name, severity: "unknown" };
        }

        const record = detail;
        return {
            name,
            severity: String(record.severity || "unknown"),
            via: Array.isArray(record.via) ? record.via.length : 0,
            url: String(record.url || ""),
        };
    });
}

function buildSummary(auditResult, exitCode, vulnerabilities) {
    const bySeverity = vulnerabilities.reduce((acc, item) => {
        const severity = String(item.severity || "unknown");
        acc[severity] = (acc[severity] || 0) + 1;
        return acc;
    }, {});

    return {
        generatedAt: new Date().toISOString(),
        exitCode,
        counts: {
            total: vulnerabilities.length,
            highOrCritical: (bySeverity.high || 0) + (bySeverity.critical || 0),
            moderate: bySeverity.moderate || 0,
        },
        severities: bySeverity,
        top: vulnerabilities.filter((item) => item.severity === "high" || item.severity === "critical"),
    };
}

function writeReports(summary, rawOutput) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    writeFileSync(JSON_REPORT_PATH, JSON.stringify(summary, null, 2), "utf8");
    writeFileSync(
        MARKDOWN_REPORT_PATH,
        `# Security Audit Report\n\n생성일: ${summary.generatedAt}\n\n- 총 취약점: ${summary.counts.total}\n- High/Critical: ${summary.counts.highOrCritical}\n- Moderate: ${summary.counts.moderate}\n\n## High/Critical 상세\n\n${summary.top.map((item) => `- ${item.name} (${item.severity})`).join("\n")}\n`,
        "utf8"
    );
    writeFileSync(resolve(OUTPUT_DIR, "security-audit-raw.json"), rawOutput, "utf8");
}

function run() {
    const { raw, exitCode } = runAuditCommand();
    let parsed = {};
    try {
        parsed = JSON.parse(raw || "{}");
    } catch {
        parsed = {};
    }
    const vulnerabilities = extractVulnerabilities(parsed);
    const summary = buildSummary(parsed, exitCode, vulnerabilities);
    writeReports(summary, raw);

    if (summary.counts.highOrCritical > 0) {
        process.exit(1);
    }
    process.exit(0);
}

run();
