/* eslint-enable @typescript-eslint/await-thenable */

interface AwaitThenableProps {
  action: () => void;
  children: React.ReactNode;
}

export function AwaitThenable({ action, children }: AwaitThenableProps) {
  const onClick = () => {
    action();
    // TODO add yellow lines (exeten settings)
  };

  return <button onClick={onClick}>{children}</button>;
}
