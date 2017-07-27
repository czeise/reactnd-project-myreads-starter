// When starting out, the default tests fail due to the use of localStorage. I found that the
// create-react-app had an example for initializing a test environment
// (https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#initializing-test-environment)
// so I used that. Discussion in Slack
// led me to another student's (abdennour) pull request to fix this issue:
// https://github.com/udacity/reactnd-project-myreads-starter/pull/4. I did a bit more
// research and came accross pretty much the same solution on StackOverflow:
// https://stackoverflow.com/a/43716474/4276293. So, if I find that the create-react-app default
// isn't enough, I can switch over to that solution.

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
