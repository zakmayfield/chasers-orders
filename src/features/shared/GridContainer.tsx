interface GridContainerProps {
  children: React.ReactNode;
  view?: View;
  cols?: number;
  gap?: number;
  border?: boolean;
}

enum Grids {
  desktop = 'grid-cols-12',
  tablet = 'grid-cols-2',
  mobile = 'grid-cols-1',
}

type View = 'desktop' | 'tablet' | 'mobile';

const GridContainer: React.FC<GridContainerProps> = ({
  children,
  view = 'desktop',
  cols,
  gap,
  // for UI testing
  border = false,
}) => {
  const columns = getGridView(view, cols);
  const gapData = gap ? 'gap-' + gap : 'gap-4';
  const hasBorder = border ? 'border' : '';

  return (
    <div className={`grid ${columns} ${gapData} ${hasBorder}`}>{children}</div>
  );
};

type Grid = Grids.desktop | Grids.tablet | Grids.mobile | string;

function getGridView(view: View, cols?: number): Grid {
  if (cols) {
    return `grid-cols-${cols}`;
  }

  switch (view) {
    case 'desktop':
      return Grids.desktop;
    case 'tablet':
      return Grids.tablet;
    case 'mobile':
      return Grids.mobile;
  }
}

export default GridContainer;
