const tokenD = artifacts.require('./tokenD.sol')

module.exports = function (deployer) {
  deployer.deploy(tokenD)
}
