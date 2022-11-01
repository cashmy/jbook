import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  nextCellId: string | null;

}

const AddCell: React.FC<AddCellProps> = ({nextCellId}) => {
  const { insertCellBefore } = useActions();

  return (
    <h1>Add Cell</h1>
  )
};
