interface GridContainerProps {
  children: React.ReactNode;
  cols?: number;
}

const GridContainer: React.FC<GridContainerProps> = ({
  children,
  cols = 1,
}) => {
  const columns = cols;
  return <div className={`grid grid-cols-${cols} gap-4`}>{children}</div>;
};

export default GridContainer;
