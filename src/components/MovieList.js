import React from "react";
import CardMovie from "./CardMovie";
import { Row } from "react-bootstrap";
import Paginationn from "./Pagination";

const MovieList = ({ movies, getPage, pageCount }) => {
  return (
    <Row className="mt-3">
      {movies.length >= 1 ? (
        movies.map((mov) => {
          return <CardMovie key={mov.id} mov={mov} />;
        })
      ) : (
        <h1 className="text-center p-5 ">NO Movies Yet</h1>
      )}

      {movies.length >= 1 ? (
        <Paginationn getPage={getPage} pageCount={pageCount} />
      ) : null}
    </Row>
  );
};
export default MovieList;
