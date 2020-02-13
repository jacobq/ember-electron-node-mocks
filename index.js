module.exports = function(options) {
  options = Object.assign({
    fs: {}, // https://github.com/tschaub/mock-fs#example
  }, options);
  let rn, pn;
  try {
    [rn, pn] = [requireNode, processNode];
  } catch(e) {
    // eslint-disable-next-line no-console
    console.warn('Application appears to be running outside of electron');
    rn = mockRequireNode(options);
    pn = mockProcessNode(options);
  }

  return {
    processNode: pn,
    requireNode: rn,
  };
};

function mockRequireNode(options) {
  const mockFs = require('mock-fs');
  return (name) => {
    switch(name) {
      default: return {};
      case 'fs': return mockFs(options.fs);
    }
  }
}

function mockProcessNode(options) {
  return {
    env: {}
  };
}

