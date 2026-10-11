import { useEffect } from 'react';
import { render, Text, useApp } from 'ink';
import { trialValue } from '@trial/shared';
function Terminal() {
  const { exit } = useApp();
  useEffect(() => {
    const timer = setTimeout(exit, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [exit]);
  return <Text>{trialValue().label}</Text>;
}
await render(<Terminal />).waitUntilExit();
