import React from "react";

const STATUS_FETCHING = "fetching";
const STATUS_FETCHED = "fetched";
const STATUS_LOADED = "loaded";

export default class extends React.Component {
    state = {
        image: null,
        loadingState: STATUS_FETCHING,
        category_ids: null
    };

    componentDidMount() {
        this.fetchAllCategories();
    }

    fetchAllCategories = () => {
        this.setState({
            loadingState: STATUS_FETCHING
        });
        fetch("https://api.thecatapi.com/v1/categories", {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(data => data.json())
            .then(data => {
                const { url } = data[0];
                this.setState({ image: url, loadingState: STATUS_FETCHED });
            });
    };

    render() {
        return (
            <div className="random">
                <div>
                    <button onClick={this.fetchAllCategories}>Get All Categories!</button>
                </div>
                <div>
                    {this.state.loadingState !== STATUS_LOADED && (
                        <div className="loader">Loading...</div>
                    )}
                    {this.state.loadingState !== STATUS_FETCHING && this.state.image ? (
                        <img
                            onLoad={() => {
                                this.setState({
                                    loadingState: STATUS_LOADED
                                });
                            }}
                            style={{
                                display:
                                    this.state.loadingState === STATUS_LOADED ? "inline" : "none"
                            }}
                            key={this.state.image}
                            src={this.state.image}
                            alt="Category name"
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}