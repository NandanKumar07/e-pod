import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";


const ImportPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const accessToken = import.meta.env.VITE_API_KEY;

  const searchPlaylists = async () => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: searchQuery,
          type: "playlist",
        },
      });

      setPlaylists(response.data.playlists.items);
    } catch (error) {
      console.error("Error searching playlists", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchPlaylists();
  };

  return (
    <div id="importPlaylist" className="pt-44 px-12 flex flex-row items-start justify-between">
      <div className="w-1/2">
        <div className="text-[80px] ">
          <span style={{ color: "#c5af76" }}>
            Search and Import Your Playlist here
          </span>{" "}
        </div>
      </div>
      <div className="w-1/2">
        <div className="relative mb-4 flex items-center">
          <form onSubmit={handleSearch}>
            <div className="flex flex-row ">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                className="relative m-0 -mr-0.5 block w-[630px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-white dark:placeholder:text-neutral-200 dark:focus:border-primary text-opacity-10"
                placeholder="Search your playlist here...."
              />
              <button
                className="relative z-[2] bg-white flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                type="submit"
              >
                <FaSearch />
              </button>
            </div>
            
          </form>

        </div>
          <div className="w-full h-[450px] overflow-auto text-xl">
            {playlists.length > 0 ? (
              <ul>
  
                {playlists.map((playlist) => (
                 
                  <li key={playlist.id}
                     className="border-2 px-4 hover:bg-gray-100 shadow-md  hover:text-black">
                    <a
                      href={playlist.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    > 
                      {playlist.name}
                    </a>
                  </li> 
                ))} 
              </ul>
            ) : (
              <p>No playlists found</p>
            )}
          </div>
        </div>
    </div>
  );
};

export default ImportPlaylist;
