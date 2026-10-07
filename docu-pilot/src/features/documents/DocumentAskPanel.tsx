"use client";

import Icon from "@/src/components/common/Icon/Icon";
import Button from "@/src/components/common/Button/Button";

const prompts = [
  "Summarize this document",
  "What are the key skills?",
  "What experience stands out?",
  "Find all important dates",
];

export default function DocumentAskPanel({ name }: { name: string }) {
  return (
    <div className="ask-layout">
      <div className="ask-intro">
        <span>
          <Icon name="spark" size={23} />
        </span>
        <div>
          <div className="page-title">Ask questions about this document</div>
          <p>Question answering will be grounded in {name} once the AI API is available.</p>
        </div>
      </div>
      <div className="suggestions">
        {prompts.map((prompt) => (
          <button type="button" key={prompt} disabled>
            {prompt}
            <Icon name="arrow" size={15} />
          </button>
        ))}
      </div>
      <div className="ask-composer">
        <label>
          <textarea
            disabled
            rows={2}
            placeholder="Ask something about this document..."
            aria-label="Ask a question about this document"
          />
          <span>Answers will use only this document&apos;s content.</span>
        </label>
        <Button icon="arrow" disabled>
          Ask AI
        </Button>
      </div>
      <div className="ai-disclaimer">
        <Icon name="shield" size={15} />
        AI-generated answers may contain errors. Verify important information against the original
        document.
      </div>
    </div>
  );
}
