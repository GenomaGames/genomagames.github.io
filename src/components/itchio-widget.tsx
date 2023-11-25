interface Props {
  backgroundColor?: string;
  borderColor?: string;
  borderSize?: number;
  buttonColor?: string;
  children?: React.ReactNode;
  className?: string;
  gameId: number;
  textColor?: string;
  width?: number;
}

const ItchioWidget: React.JSXElementConstructor<Props> = ({
  backgroundColor,
  borderColor,
  borderSize,
  buttonColor,
  children,
  className,
  gameId,
  textColor,
  width = 560,
}) => {
  return (
    <iframe
      className={className}
      src={`https://itch.io/embed/${gameId}?border_width=${borderSize}&bg_color=${backgroundColor}&fg_color=${textColor}&link_color=${buttonColor}&border_color=${borderColor}`}
      width={width}
      height={175}
    >
      {children}
    </iframe>
  );
};

export default ItchioWidget;
