import React from 'react';
import D2Reader from '@d-i-t-a/reader';

export default function Reader() {

    const [reader, setReader] = React.useState<D2Reader | null>(null);
    const [scrolling, setScrolling] = React.useState<boolean>(true);

    React.useEffect(() => {
        const url = new URL("https://alice.dita.digital/manifest.json");
        
        const injectables = [ { type: 'style', url: '/readium-css/ReadiumCSS-before.css', r2before: true, },
        { type: 'style', url: '/readium-css/ReadiumCSS-default.css', r2default: true, }, 
        { type: 'style', url: '/readium-css/ReadiumCSS-after.css', r2after: true, }, ];

        D2Reader.load({
          url,
          injectables: injectables as any,
          injectablesFixed: [],
        }).then(setReader);

    }, []);


    function scroll() {
      reader?.scroll(true);
      setScrolling(true);
    }
    
    function paginate() {
      reader?.scroll(false);
      setScrolling(false);
    }

    return (
        <div>
      <div>
        {!reader ? (
          <strong>Loading reader...</strong>
        ) : (
          <div style={{ position: "fixed", top: "0px", zIndex: 2 }}>
            <button onClick={reader.previousPage}>Prev Page</button>
            <button onClick={reader.nextPage}>Next Page</button>
            {scrolling ? (
              <button onClick={paginate}>Paginate</button>
            ) : (
              <button onClick={scroll}>Scroll</button>
            )}
          </div>
        )}
        <div
          id="D2Reader-Container"
          style={{
            border: "solid 5px rebeccapurple",
          }}
        >
          <main
            tabIndex={-1}
            id="iframe-wrapper"
            style={{
              height: "calc(100vh - 10px)",
            }}
          >
            <div id="reader-loading" className="loading"></div>
            <div id="reader-error" className="error"></div>
          </main>
        </div>
      </div>
    </div>
    );
}

