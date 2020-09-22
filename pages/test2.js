// src/components/pagination.table.js
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useTable, usePagination } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 2, pageSize: 5 },
        },
        usePagination
    )

    // Render the UI for your table
    return (
        <div>
            {/* <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code>
            </pre> */}
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
            <ul className="pagination">
                <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <a className="page-link">First</a>
                </li>
                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <a className="page-link">{'<'}</a>
                </li>
                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <a className="page-link">{'>'}</a>
                </li>
                <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <a className="page-link">Last</a>
                </li>
                <li>
                    <a className="page-link">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </a>
                </li>
                <li>
                    <a className="page-link">
                        <input
                            className="form-control"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px', height: '20px' }}
                        />
                    </a>
                </li>{' '}
                <select
                    className="form-control"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ width: '120px', height: '38px' }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </ul>
        </div >
    )
}

function PaginationTableComponent() {
    const columns = React.useMemo(
        () => [
            {
            //     Header: 'Name',
            //     columns: [
            //         {
            //             Header: 'First Name',
            //             accessor: 'firstName',
            //         },
            //         {
            //             Header: 'Last Name',
            //             accessor: 'lastName',
            //         },
            //     ],
            // },
            // {
            //     Header: 'Info',
            //     columns: [
            //         {
            //             Header: 'Age',
            //             accessor: 'age',
            //         },
            //         {
            //             Header: 'Visits',
            //             accessor: 'visits',
            //         },
            //         {
            //             Header: 'Status',
            //             accessor: 'status',
            //         },
            //         {
            //             Header: 'Profile Progress',
            //             accessor: 'progress',
            //         },
            //     ],



                Header: 'Data',
                columns: [
                {
                    Header: 'ID',
                    accessor: 'ID',
                },
                {
                    Header: 'Name Submitted',
                    accessor: 'Name_submitted',
                },
                {
                    Header: 'Overall Score',
                    accessor: 'Overall_score',
                },
                {
                    Header: 'Name Macthed ID',
                    accessor: 'Name_matched_id',
                },
                {
                    Header: 'Name Macthed',
                    accessor: 'Name_matched',
                },
                {
                    Header: 'Name Score',
                    accessor: 'Name_score',
                },
                {
                    Header: 'Name Matched Rank',
                    accessor: 'Name_matched_rank',
                },
                {
                    Header: 'Author Submitted',
                    accessor: 'Author_submitted',
                },
                {
                    Header: 'Author Score',
                    accessor: 'Author_score',
                },
                {
                    Header: 'Canonical Author',
                    accessor: 'Canonical_author',
                },
                {
                    Header: 'Name Matched - Accepted Family',
                    accessor: 'Name_matched_accepted_family',
                },
                {
                    Header: 'Genus Submitted',
                    accessor: 'Genus_submitted',
                },
                {
                    Header: 'Genus Macthed',
                    accessor: 'Genus_matched',
                },
                {
                    Header: 'Genus Score',
                    accessor: 'Genus_score',
                },
                {
                    Header: 'Specific Epithet submitted',
                    accessor: 'Specific_epithet_submitted',
                },
                {
                    Header: 'Specific Epithet Matched',
                    accessor: 'Specific_epithet_matched',
                },
                {
                    Header: 'Specific Epithet Score',
                    accessor: 'Specific_epithet_score',
                },
                {
                    Header: 'Family Submitted',
                    accessor: 'Family_submitted',
                },
                {
                    Header: 'Family Macthed',
                    accessor: 'Family_matched',
                },
                {
                    Header: 'Family Score',
                    accessor: 'Family_score',
                },
                {
                    Header: 'Infraspecific Rank',
                    accessor: 'Infraspecific_rank',
                },
                {
                    Header: 'Infraspecific Epithet Macthed',
                    accessor: 'Infraspecific_epithet_matched',
                },
                {
                    Header: 'Infraspecific Epithet Score',
                    accessor: 'Infraspecific_epithet_score',
                },
                {
                    Header: 'Infraspecific Rank 2',
                    accessor: 'Infraspecific_rank_2',
                },
                {
                    Header: 'Infraspecific Epithet 2 Macthed',
                    accessor: 'Infraspecific_epithet_2_matched',
                },
                {
                    Header: 'Infraspecific Epithet 2 Score',
                    accessor: 'Infraspecific_epithet_2_score',
                },
                {
                    Header: 'Annotations',
                    accessor: 'Annotations',
                },
                {
                    Header: 'Unmatched Terms',
                    accessor: 'Unmatched_terms',
                },
                {
                    Header: 'Name Macthed URL',
                    accessor: 'Name_matched_url',
                },
                {
                    Header: 'Name Macthed LSID',
                    accessor: 'Name_matched_lsid',
                },
                {
                    Header: 'Phonetic',
                    accessor: 'Phonetic',
                },
                {
                    Header: 'Taxonomic Status',
                    accessor: 'Taxonomic_status',
                },
                {
                    Header: 'Accepted Name',
                    accessor: 'Accepted_name',
                },
                {
                    Header: 'Accepted Species',
                    accessor: 'Accepted_species',
                },
                {
                    Header: 'Accepted Name Author',
                    accessor: 'Accepted_name_author',
                },
                {
                    Header: 'Accepted Name ID',
                    accessor: 'Accepted_name_id',
                },
                {
                    Header: 'Accepted Name Rank',
                    accessor: 'Accepted_name_rank',
                },
                {
                    Header: 'Accepted Name URL',
                    accessor: 'Accepted_name_url',
                },
                {
                    Header: 'Accepted Name LSID',
                    accessor: 'Accepted_name_lsid',
                },
                {
                    Header: 'Accepted Family',
                    accessor: 'Accepted_family',
                },
                {
                    Header: 'Overall Score Order',
                    accessor: 'Overall_score_order',
                },
                {
                    Header: 'Highertaxa Score Order',
                    accessor: 'Highertaxa_score_order',
                },
                {
                    Header: 'Source',
                    accessor: 'Source',
                },
                {
                    Header: 'Warnings',
                    accessor: 'Warnings',
                },
            ]

            },
        ],
        
    )

    const test = {
        opts: {
          sources: "tropicos,tpl,usda",
          class: "tropicos",
          mode: "resolve",
          matches: "best",
        },
        // TODO: add more names
        data: [
            [
                1,
                'RUBIACEAE Alseis'
            ]
        ]
      };
    
    const [result, setResult] = useState("");

    axios
      .post("http://vegbiendev.nceas.ucsb.edu:8975/tnrs_api.php", test, {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (res) => {
          //console.log(res);
          setResult(JSON.stringify(res.data));

        },
        (error) => {
          console.log(error);
        }
      );

    // const data = [
    //     {
    //         "firstName": "committee-c15dw",
    //         "lastName": "editor-ktsjo",
    //         "age": 3,
    //         "visits": 46,
    //         "progress": 75,
    //         "status": "relationship"
    //     },
    //     {
    //         "firstName": "midnight-wad0y",
    //         "lastName": "data-7h4xf",
    //         "age": 1,
    //         "visits": 56,
    //         "progress": 15,
    //         "status": "complicated"
    //     },
    //     {
    //         "firstName": "tree-sbdb0",
    //         "lastName": "friendship-w8535",
    //         "age": 1,
    //         "visits": 45,
    //         "progress": 66,
    //         "status": "single"
    //     },
    //     {
    //         "firstName": "chin-borr8",
    //         "lastName": "shirt-zox8m",
    //         "age": 0,
    //         "visits": 25,
    //         "progress": 67,
    //         "status": "complicated"
    //     },
    //     {
    //         "firstName": "women-83ef0",
    //         "lastName": "chalk-e8xbk",
    //         "age": 9,
    //         "visits": 28,
    //         "progress": 23,
    //         "status": "relationship"
    //     }]

    console.log(JSON.stringify(result));


    return (
        <Table columns={columns} data={result} />
    )
}

export default PaginationTableComponent;