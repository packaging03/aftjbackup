import React from 'react';

export const DBContext = React.createContext({
  podcasts: [],
  subToPodcast: () => Promise.resolve(),
});

export const DBProvider = props => {
  const [podcasts, setPodcasts] = React.useState([]);
  const [noSong, setNoSong] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        let res = await fetch('https://church.aftjdigital.com/api/all_podcast');
        let json = await res.json();
        if (json.status === 'success') {
          const podc = [];

          for (let element of json.Podcasts) {
            const pod = {};
            pod['title'] = element.title;
            pod['artist'] = element.poster;
            pod['artwork'] = element.image;
            pod['url'] = element.file;
            pod['id'] = element.id;
            podc.push(pod);
          }

          if (podc.length != 0) {
            setPodcasts(podc);
          } else {
            setNoSong(true);
          }
        }
      } catch (e) {
        console.error(e);
        if (e.message == 'Network request failed') {
          Toast.show('Internet Connection Error', Toast.LONG);
        }
      }
    })();

    getSongs()(async () => {
      if (db.current) {
        const _podcasts = await db.current.getAllPodcast();
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noSong]);

  // const subToPodcast = async podcast => {
  //   if (db.current) {
  //     await db.current.subscribeToPodcast(podcast);

  //     const _podcasts = await db.current.getAllPodcast();

  //     setPodcasts(_podcasts);
  //   }
  // };

  const value = {
    podcasts,
    // subToPodcast,
  };

  return (
    <DBContext.Provider value={value}>{props.children}</DBContext.Provider>
  );
};
