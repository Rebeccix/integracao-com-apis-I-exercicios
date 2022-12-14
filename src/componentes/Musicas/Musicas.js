import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
} from "./styled";

const musicasLocal = [
  {
    artist: "Artista 1",
    id: "1",
    name: "Musica1",
    url: "http://spoti4.future4.com.br/1.mp3",
  },
  {
    artist: "Artista 2",
    id: "2",
    name: "Musica2",
    url: "http://spoti4.future4.com.br/2.mp3",
  },
  {
    artist: "Artista 3",
    id: "3",
    name: "Musica3",
    url: "http://spoti4.future4.com.br/3.mp3",
  },
];

export default function Musicas(props) {
  const [musicas, setMusicas] = useState(musicasLocal);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");

  const getTracks = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        {
          headers: {
            Authorization: "becca",
          },
        }
      )
      .then((res) => setMusicas(res.data.result.tracks))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTracks();
  }, []);

  const AddMusic = (name, artist, url) => {
    const body = {
      name,
      artist,
      url,
    };

    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        body,
        {
          headers: {
            Authorization: "becca",
          },
        }
      )
      .then((res) => getTracks())
      .catch((err) => console.log(err));
  };

  const deleteMusic = (id) => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`,
        {
          headers: {
            Authorization: "becca",
          },
        }
      )
      .then((res) => getTracks())
      .catch((err) => console.log(err));
  };

  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={() => deleteMusic(musica.id)}>X</button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica
          placeholder="artista"
          onChange={(e) => setArtist(e.target.value)}
        />
        <InputMusica
          placeholder="musica"
          onChange={(e) => setName(e.target.value)}
        />
        <InputMusica
          placeholder="url"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Botao onClick={() => AddMusic(name, artist, url)}>
          Adicionar musica
        </Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
