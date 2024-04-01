const core = require('@actions/core');
const github = require('@actions/github');

try {
  const eventType = github.context.eventName;
  let environmentName;

  switch (eventType) {
    case 'pull_request':
      const baseBranch = github.context.payload.pull_request.base.ref;
      if (baseBranch === 'main') {
        environmentName = 'production_pr';
      } else {
        environmentName = 'other_pr';
      }
      break;
    case 'push':
      const currentBranch = github.context.payload.ref.replace('refs/heads/', '');
      if (currentBranch === 'main') {
        environmentName = 'production';
      } else {
        environmentName = 'other';
      }
      break;
    case 'workflow_dispatch':
      environmentName = 'production';
      break;
    default:
      core.setFailed(`Unsupported event type: ${eventType}`);
      return;
  }

  core.setOutput('environment_name', environmentName);
} catch (error) {
  core.setFailed(error.message);
}
