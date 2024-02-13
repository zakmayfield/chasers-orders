interface GridContainerProps {
  children: React.ReactNode;
  view?: View;
  cols?: number;
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
}) => {
  let columns = getGridView(view, cols);

  return <div className={`grid ${columns}`}>{children}</div>;
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
