import './Main.css';
import Header from './Header';
import Lists from './Lists';
import Tasks from './Tasks';
import App from '../App';
import ImageView from './ImageView';

export default function () {
  return (
    <div
      className="main">
      <Header>
      </Header>
      <Lists></Lists>
      <ImageView />
    </div>
  )
}
