import React, { Component } from 'react';
import './App.css';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid text-monospace main">
          <br></br>
          &nbsp;
          <br></br>
          <div className="row">
            <div className="col-md-10">
              <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '720px'}}>
                <medicine
                  src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                  controls
                >
                </medicine>
              </div>
            <h3 className="mt-3"><b><i className="medicine-mname">{this.props.currentmname}</i></b></h3>
          </div>
          <div className="vide-feed col-md-2 border border-secondary overflow-auto text-center" style={{ maxHeight: '4000px', minWidth: '175px' }}>
            <h5 className="feed-mname"><b>medicine Feed 📺</b></h5>
            <form onSubmit={(event) => {
              event.preventDefault()
              const mname = this.medicinemname.value
              this.props.Checkmed(mname)
            }} >
              &nbsp;
              <input type='file' accept=".mp4, .mov, .mkv .ogg .wmv" onChange={this.props.captureFile} style={{ width: '250px' }} />
                <div className="form-group mr-sm-2">
                  <input
                    id="medicinemname"
                    type="text"
                    ref={(input) => { this.medicinemname = input }}
                    className="form-control-sm mt-3 mr-3"
                    placeholder="mname.."
                    required />
                </div>
              <button type="submit" className="btn border border-dark btn-primary btn-block btn-sm">Upload</button>
              &nbsp;
            </form>
            { this.props.medicines.map((medicine, key) => {
              return(
                  <div className="card mb-4 text-center hover-overlay bg-secondary mx-auto" style={{ width: '195px'}} key={key} >
                    <div className="card-mname bg-dark">
                      <small className="text-white"><b>{medicine.mname}</b></small>
                    </div>
                    <div>
                      <p onClick={() => this.props.changemedicine(medicine.hash, medicine.mname)}>
                        <medicine
                          src={`https://ipfs.infura.io/ipfs/${medicine.hash}`}
                          style={{ width: '170px' }}
                        />
                      </p>
                    </div>
                  </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
