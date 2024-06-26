import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";

import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });

  const lyricsData = songData?.resources.lyrics;

  return (
    <div className="flex flex-col">
      {/* <DetailsHeader artistId={artistId} songData={songData} /> */}
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics: </h2>
        <div className="mt-5">
          {lyricsData ? (
            Object.keys(lyricsData).map((lyricsKey) =>
              lyricsData[lyricsKey].attributes.text.map((line, i) => (
                <p key={i}>{line}</p>
              ))
            )
          ) : (
            <p>Sorry, no lyrics found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
