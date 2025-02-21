import "./Card.css";
import { HiStar, HiOutlineStar } from "react-icons/hi2";

interface CardProps {
  image: string;
  title: string;
  description: string;
  url: string;
  isFavorite: boolean;
  onToggleFavorite: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  url,
  isFavorite,
  onToggleFavorite,
}) => {
  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Evita que el clic afecte el enlace
    onToggleFavorite(event);
  };

  return (
    <div className="card">
      <a
        href={url}
        rel="noopener noreferrer"
        className="card-link"
      >
        <div className="image-container">
          <img src={image} alt={title} className="card-image" />
        </div>
        <div className="content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
        </div>
      </a>
      <button className="favorite-btn" onClick={handleFavoriteClick}>
        {isFavorite ? <HiStar color="gold" /> : <HiOutlineStar color="gold" />}
      </button>
    </div>
  );
};

export default Card;
