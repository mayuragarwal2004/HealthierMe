import React from 'react'
import { Link } from "react-router-dom";

const NoCommunity = () => {
  return (
    <div>
        <button>Join Community</button>
        <Link to="/createcommunity"><button>Create Community</button></Link>
    </div>
  )
}

export default NoCommunity