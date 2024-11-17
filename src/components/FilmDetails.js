import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FilmDetails = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [relatedData, setRelatedData] = useState({
    people: [],
    species: [],
    locations: [],
    vehicles: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        // Obtener los detalles de la película
        const response = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
        const data = await response.json();
        setFilm(data);

        // Obtener datos relacionados (personajes, especies, ubicaciones, vehículos)
        const relatedKeys = ["people", "species", "locations", "vehicles"];
        const relatedPromises = relatedKeys.map((key) =>
          Promise.all(data[key].map((url) => fetch(url).then((res) => res.json())))
        );

        const [people, species, locations, vehicles] = await Promise.all(relatedPromises);

        setRelatedData({ people, species, locations, vehicles });
      } catch (error) {
        console.error("Error fetching film details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!film) {
    return <p className="text-center">Film not found</p>;
  }

  return (
    <div className="film-details-container">
      {/* Título e imagen principal */}
      <div className="film-header">
        <h1 className="film-title">{film.title}</h1>
        <img src={film.movie_banner} alt={film.title} className="film-banner" />
      </div>

      {/* Información principal */}
      <div className="film-info">
        <h2>Details</h2>
        <p><strong>Original Title:</strong> {film.original_title}</p>
        <p><strong>Romanised Title:</strong> {film.original_title_romanised}</p>
        <p><strong>Director:</strong> {film.director}</p>
        <p><strong>Producer:</strong> {film.producer}</p>
        <p><strong>Release Date:</strong> {film.release_date}</p>
        <p><strong>RT Score:</strong> {film.rt_score}</p>
      </div>

      {/* Descripción */}
      <div className="film-description">
        <h2>Description</h2>
        <p>{film.description}</p>
      </div>

      {/* Información adicional */}
      <div className="film-additional">
        <h2>Additional Information</h2>

        {/* Personajes */}
        <h3>Characters</h3>
        {relatedData.people.length > 0 ? (
          <ul>
            {relatedData.people.map((person) => (
              <li key={person.id}>
                <strong>{person.name}</strong> - {person.gender}, {person.age} years old
              </li>
            ))}
          </ul>
        ) : (
          <p>Not available</p>
        )}

        {/* Especies */}
        <h3>Species</h3>
        {relatedData.species.length > 0 ? (
          <ul>
            {relatedData.species.map((species) => (
              <li key={species.id}>
                <strong>{species.name}</strong> - {species.classification}
              </li>
            ))}
          </ul>
        ) : (
          <p>Not available</p>
        )}

        {/* Ubicaciones */}
        <h3>Locations</h3>
        {relatedData.locations.length > 0 ? (
          <ul>
            {relatedData.locations.map((location) => (
              <li key={location.id}>
                <strong>{location.name}</strong> - Climate: {location.climate}, Terrain: {location.terrain}
              </li>
            ))}
          </ul>
        ) : (
          <p>Not available</p>
        )}

        {/* Vehículos */}
        <h3>Vehicles</h3>
        {relatedData.vehicles.length > 0 ? (
          <ul>
            {relatedData.vehicles.map((vehicle) => (
              <li key={vehicle.id}>
                <strong>{vehicle.name}</strong> - {vehicle.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>Not available</p>
        )}
      </div>
    </div>
  );
};

export default FilmDetails;
