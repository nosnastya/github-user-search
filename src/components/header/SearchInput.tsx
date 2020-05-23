
import React, { useState, useEffect, useRef } from "react";
import { RootState } from "../../redux";
import { loadUsers } from "../../redux/modules/users";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

const mapStateToProps = (state: RootState) => ({
    users: state.users.users
  });

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            loadUsers
        },
        dispatch
    );
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const UnconnectedSearchInput: React.FC<Props> = ({ loadUsers, users }) => {
    const [query, setQuery] = useState("tradeling");
    const focusSearch = useRef(null)

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    useEffect(() => {
        let currentQuery = true

        const loadJokes = async () => {

            await sleep(350)
            if (currentQuery) {
                loadUsers(query)
            }
        }
        loadJokes()

        return () => {
            currentQuery = false
        }
    }, [loadUsers, query])

    return (
        <div className="search-box">
            <input
                type="search"
                placeholder="Search..."
                ref={focusSearch}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
};

export const SearchInput = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedSearchInput);
