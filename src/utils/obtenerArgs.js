function obtenerArgs() {
    const argv = process.argv;
    let port = process.env.PORT || 8080;
    let facebook_client_id = "895703051379886";
    let facebook_client_secret = "8a5714c1dd03fa7850bfc7af42fcf75e";
   
    let modoCluster = false;
    let persistencia = "mongo";
   
    if (argv[2] != null) {
      const args = argv[2].split(" ");
      args.forEach((arg) => {
        if (arg.indexOf("=") != -1) {
          const split = arg.split("=");
          if (split[0] == "port") {
            port = +split[1];
          }
          if (split[0] == "facebook_client_id") {
            facebook_client_id = split[1];
          }
          if (split[0] == "facebook_client_secret") {
            facebook_client_secret = split[1];
          }
          if (split[0] == "CLUSTER") {
            modoCluster = true;
          }
          if (split[0] == "FORK") {
            modoCluster = false;
          }
          if(split[0] == "PERSISTENCIA") {
            persistencia = split[1];
          }
        }
      })
    }
   
    return { port, facebook_client_id, facebook_client_secret, modoCluster, persistencia }
   
    
  }
   
  module.exports = obtenerArgs