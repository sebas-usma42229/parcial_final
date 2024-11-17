import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Films = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films")
      .then((response) => response.json())
      .then((data) => {
        setFilms(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="films-background">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container">
          <span className="navbar-brand mx-auto text-center">
            Studio Ghibli Films
          </span>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mt-4">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="row">
            {films.map((film) => (
              <div key={film.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card h-100">
                  <img
                    src={film.image}
                    className="card-img-top"
                    alt={film.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{film.title}</h5>
                    <p className="card-text">
                      <strong>Original Title:</strong> {film.original_title}
                    </p>
                    <p className="card-text">
                      <strong>Romanised Title:</strong> {film.original_title_romanised}
                    </p>
                    <p className="card-text">
                      <strong>Release Date:</strong> {film.release_date}
                    </p>
                    <p className="card-text">
                      <strong>RT Score:</strong> {film.rt_score}
                    </p>
                    <p className="card-text">
                      <strong>Description:</strong>{" "}
                      {film.description.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="card-footer text-center">
                    <Link
                      to={`/films/${film.id}`}
                      className="btn btn-primary w-100"
                    >
                      Más información
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Films;