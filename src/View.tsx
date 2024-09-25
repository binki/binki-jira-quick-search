import React from 'react';

function View({
  params,
  setHash,
}:{
  params:{
    [key:string]:string,
  },
  setHash:(path:string, params?:{})=>void,
}) {
  const [term, setTerm] = React.useState('');
  const instance = (() => {
    try {
      return new URL(params.instance);
    } catch (e) {
      console.error(e);
    }
  })();
  const project = params.project;
  const valid = !!(instance && project);
  React.useEffect(() => {
    if (!valid) {
      setHash('setup');
    }
  }, [setHash, valid]);
  if (valid) {
    return (
      <div>
        <form onSubmit={e => { window.location.href = new URL(`jira/software/c/projects/${encodeURIComponent(project)}/issues?jql=${encodeURIComponent(`project = "${project.replace(/"/g, '\\"')}" AND status != Done AND text ~ "${term.replace(/"/g, '""')}" ORDER BY key DESC, created DESC`)}`, instance).toString(); e.preventDefault(); }}>
          <div><label htmlFor="input-terms">Terms</label><input autoFocus={true} id="input-terms" onChange={e => setTerm(e.target.value)} value={term}/><button>Go</button></div>
        </form>
      </div>
    );
  } else {
    return (
      <div>There was an error in the data. Returning you to setup.</div>
    );
  }
}

export default View;
