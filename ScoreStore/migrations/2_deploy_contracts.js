var StoreScore = artifacts.require("./ScoreStore.sol")
module.exports = function(deployer) {
  deployer.deploy(StoreScore)
}