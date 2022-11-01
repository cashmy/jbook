import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    // Add "show" function to the top of the bundle
    // _React and _ReactDOM are used to avoid naming conflicts
    // Both variables (React and _React) point to the same package.
    //    ESBuild is been configured to use these particular names
    //    instead createReactElement and createReactDOM
    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
          const root = document.querySelector('#root');
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) { 
              _ReactDOM.render(value, root);
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        };
      `;
    const showFuncNoop = 'var show = () => {}';

    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cell.id) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 1250)
    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join('\n'), cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-smal is-primary' max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;