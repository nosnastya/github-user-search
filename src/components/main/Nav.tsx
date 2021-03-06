
import React, { useState, useEffect } from "react";
import { RootState } from "../../redux/reducers";
import { selectEntityType, loadEntities, resetEntities, resetEntitiesResolved, changeSearchQueue } from "../../redux/actions/entities"
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Select } from "../ui/Select";
import { Entities } from "../../enums/shared";
import styles from "./Nav.module.scss";
import * as _ from "lodash";

const mapStateToProps = (state: RootState) => ({
    selectedEntityType: state.entities.type,
    isLoading: state.entities.isLoading,
    searchQueue: state.entities.searchQueue
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            loadEntities,
            resetEntitiesResolved,
            resetEntities,
            selectEntityType,
            changeSearchQueue
        },
        dispatch
    );

const searchOptions = [
    {
        label: "Users",
        value: Entities.User
    },
    {
        label: "Repositories",
        value: Entities.Repository
    },
];

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export const UnconnectedNav: React.FC<Props> = ({
    loadEntities,
    resetEntitiesResolved,
    resetEntities,
    selectedEntityType,
    selectEntityType,
    changeSearchQueue,
    searchQueue
}) => {
    const [searchQuery, setSearchQuery] = useState(searchQueue);
    const [isSearchTop, setIsSearchTop] = useState(false);

    const loadResults = ({ searchQuery = searchQueue, entityType = selectedEntityType}: {searchQuery?: string, entityType?: EntityType })  => {
        if (searchQuery.length >= 3) {
            setIsSearchTop(true)
            loadEntities(searchQuery, entityType);
        }
    };

    useEffect(() => {
        loadResults({});
    },[]); // needed to run only once on component render

    const debouncedOnChange = _.debounce((searchQuery) => loadResults({searchQuery: searchQuery}), 1000);

    const onChange = (event: React.SyntheticEvent) => {
        const
            target = event.target as HTMLTextAreaElement,
            searchString = target.value;

        event.persist();

        if (!searchString) {
            resetEntities()
            setIsSearchTop(false)
        }
        changeSearchQueue(searchString); // needed for persisting data on page reload
        setSearchQuery(searchString);
        if (searchString.length >= 3) {
            debouncedOnChange(searchString);
        }
    };

    const handleSelectChange = (entityType: Entities) => {
        selectEntityType(entityType);
        resetEntitiesResolved();
        loadResults({ searchQuery: searchQuery, entityType: entityType });
    };

    return (
        <div className={isSearchTop ? styles.headerSearchWrapper : styles.centeredSearchWrapper}>
            <div className={styles.search}>
                <div className="disp-flex flex-align--center mar-ver--20">
                    <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                    <div className="mar-lft--10">
                        <h1 className="mar-no text-dark-gray">Github Searcher</h1>
                        <p className="text-gray mar-no">Search users or repositories below</p>
                    </div>
                </div>
                <div className="disp-flex">
                    <input
                        type="search"
                        placeholder="Start typing to search..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={onChange}
                    />
                    <Select
                        className="mar-lft--10"
                        options={searchOptions}
                        defaultValue={selectedEntityType}
                        onChange={(entityType) => handleSelectChange(entityType)}
                    />
                </div>
            </div>
        </div>
    );
};

export const Nav = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedNav);
