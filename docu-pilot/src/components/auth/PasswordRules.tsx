"use client";

import Icon from "@/src/components/common/Icon/Icon";
import { passwordRules } from "@/src/validators/auth.validators";

export default function PasswordRules({ password }: { password: string }) {
  const rules = passwordRules(password);

  return (
    <div className="rules" aria-live="polite">
      {rules.map((rule) => (
        <span className={rule.met ? "met" : ""} key={rule.label}>
          <span className="rule-icon">
            <Icon name="check" size={12} />
          </span>
          {rule.label}
        </span>
      ))}
    </div>
  );
}
