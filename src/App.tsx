import React from 'react';
import Setup from './Setup'
import View from './View';
import './App.css';

function App() {
  const [href, setHref] = React.useState(window.location.href);
  React.useEffect(() => {
    function handlePopState() {
      setHref(window.location.href);
    }
    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const [, uriBase, hashPath, hashParams] = (/([^#]*)(?:#([^?]*)\??(.*))?/.exec(href) || []);
  const setHash = React.useCallback((path:string, params?:{[key:string]:string}) => {
      const serializedParams = params ? Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`).join('&') : '';
      window.location.href = uriBase + '#' + path + (serializedParams.length ? '?' + serializedParams : '');
  }, [uriBase]);
  const goodRender = (() => {
    if (hashPath) {
      const params = Object.create(null);
      for (const pair of (hashParams || '').split(/&/g).map(param => param.split('='))) {
        if (pair[0]) {
          params[decodeURIComponent(pair[0])] = decodeURIComponent(pair.slice(1).join('='));
        }
      }
      if (hashPath === 'setup') {
        return (
          <Setup setHash={setHash}/>
        );
      }
      if (hashPath === 'view') {
        return (
          <View params={params} setHash={setHash}/>
        );
      }
    }
  })();
  const isGoodRender = !!goodRender;
  React.useEffect(() => {
    if (!isGoodRender) {
      // Just redirect them to something valid.
      setHash('setup');
    }
  }, [isGoodRender, setHash]);
  if (goodRender) {
    return goodRender;
  } else {
  return (
    <div>Redirecting…</div>
  );
    }
}

export default App;
