import React from 'react';

function Setup(props:{
  setHash:(path:string, params:{})=>void,
}) {
  const instanceInputId = React.useId();
  const projectInputId = React.useId();
  const [instance, setInstance] = React.useState('');
  const [project, setProject] = React.useState('');
  const instanceValid = (() => {
    try {
      new URL(instance);
      return true;
    } catch {
      return false;
    }
  })();
  const valid = instanceValid;
  function handleSubmit() {
    if (!instanceValid) {
      alert('You must provide a valid URL for the instance.');
    } else {
      props.setHash('view', {
        instance,
        project,
      });
    }
  }
  return (
    <div>
      <div>
        Enter information about your Jira instance.
      </div>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        <div><label htmlFor={instanceInputId}>Instance URI</label><input id={instanceInputId} onChange={e => setInstance(e.target.value)} required={true} value={instance}/></div>
        <div><label htmlFor={projectInputId}>Project</label><input id={projectInputId} onChange={e => setProject(e.target.value)} required={true} value={project}/></div>
        <div><button disabled={!valid}>Create</button></div>
      </form>
    </div>
  );
}

export default Setup;
