import { useActions } from "../hooks/use-actions";
import './action-bar.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { move_cell, delete_cell } = useActions();

  return (
    <div className="action-bar">
      {/* Up */}
      <button className="button is-primary is-small" onClick={() => move_cell(id, 'up')}>
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>

      {/* Down */}
      <button className="button is-primary is-small"  onClick={() => move_cell(id, 'down')}>
      <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>

      {/* Delete */}
      <button className="button is-primary is-small" onClick={() => delete_cell(id)}>
      <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
}

export default ActionBar;