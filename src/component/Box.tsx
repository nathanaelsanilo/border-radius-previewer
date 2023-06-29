import { useEffect, useRef, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { CopyIcon } from '@radix-ui/react-icons';
import { useDebounce } from 'rooks';

type Props = Partial<{
  tl: number;
  tr: number;
  bl: number;
  br: number;
}>;

export default function Box({ tl = 0, tr = 0, bl = 0, br = 0 }: Props) {
  const [isTooltipShow, toggleTooltip] = useState(false);
  const setToggle = useDebounce(toggleTooltip, 1500);
  const boxRef = useRef<HTMLDivElement>(null);
  const [currStyle, setCurrStyle] = useState<string>('');

  const style = {
    borderTopLeftRadius: tl || 0,
    borderTopRightRadius: tr || 0,
    borderBottomLeftRadius: bl || 0,
    borderBottomRightRadius: br || 0,
  };

  useEffect(() => {
    setCurrStyle(() => boxRef.current?.style.cssText || '');
  }, [tl, tr, bl, br]);

  const copyText = () => {
    navigator.clipboard.writeText(currStyle);
    toggleTooltip(() => true);
  };

  const onTooltipOpen = (): void => {
    setToggle(false);
  };

  return (
    <div className="gap-4 flex flex-col items-center">
      <div ref={boxRef} className="border bg-blue-600 text-white h-72 w-72 p-4" style={style} />
      <div className="border border-gray-900 rounded-lg p-4 bg-gray-100">
        <div className="text-right">
          <Tooltip.Root open={isTooltipShow} onOpenChange={onTooltipOpen}>
            <Tooltip.Trigger asChild>
              <button
                onClick={copyText}
                className="rounded bg-gray-300 p-2 active:bg-gray-400 text-gray-700"
                type="button"
              >
                <CopyIcon />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="bg-green-500 p-2 shadow-lg rounded-lg text-white" sideOffset={5}>
                Success!
                <Tooltip.Arrow className="fill-green-500" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>
        <pre className="mt-2">{currStyle}</pre>
      </div>
    </div>
  );
}
