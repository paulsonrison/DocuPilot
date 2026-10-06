export default function FormStatus({ children }: { children: string }) {
  return (
    <p role="status" aria-live="polite" className="sr-only">
      {children}
    </p>
  );
}
