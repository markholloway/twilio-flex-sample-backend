function setCORSHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "OPTIONS POST GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function setupHeartbeatMonitor(name, websocketServer, timeout) {
  setInterval(function ping() {
    console.debug(
      name + " heartbeat, active clients: " + websocketServer.clients.size
    );
    websocketServer.clients.forEach(function each(webSocketClient) {
      if (webSocketClient.isAlive === false) {
        console.warn(
          "Possible network issue: webSocketClient timed out after 30 seconds, terminating"
        );

        return webSocketClient.terminate();
      }

      webSocketClient.isAlive = false;
      webSocketClient.ping(() => {});
    });
  }, timeout);
}

module.exports = { setCORSHeaders, setupHeartbeatMonitor };
