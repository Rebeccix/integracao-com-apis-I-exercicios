import React, { useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";
import { useEffect } from "react";

const playlistsLocal = [
  {
    id: 1,
    name: "Playlist 1",
  },
  {
    id: 2,
    name: "Playlist 2",
  },
  {
    id: 3,
    name: "Playlist 3",
  },
  {
    id: 4,
    name: "Playlist 4",
  },
];
function Playlists() {
  const [playlists, setPlaylists] = useState(playlistsLocal);

  useEffect(() => {
    axios
      .get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
        headers: {
          Authorization: "becca",
        },
      })
      .then((response) => {
        setPlaylists(response.data.result.list);
        // console.log(response.data.result.list);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <div>
      {playlists.map((playlist) => {
        return <Musicas key={playlist.id} playlist={playlist} />;
      })}
    </div>
  );
}

export default Playlists;
