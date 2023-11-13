function Response(success, msg, data) {
    let response = { success: success, msg: msg, data: data };
    return response;
  }