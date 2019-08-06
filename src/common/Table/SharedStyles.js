import React from 'react';
import styled from 'styled-components';

const TableHeader =  styled.tr `
min-height: 54px;
max-height: 54px;
padding-left: 0.5rem;
background-color: #3c65ab;
color: white;
text-transform: uppercase;
display: flex;
flex-wrap: wrap;
max-width: 99vw !important;
flex-direction: column;
`;

const Headername = styled.span `
    font-weight: 650;
`;

const CompareIcon = styled.th `
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    cursor: pointer;
`;

const HeaderCell = styled.th `
    padding-left: 0.5rem;
    padding: 0;
    margin: 0;
    align-content: center;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 262px;
    position: relative;
    width: 262px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    min-height: 52px;
    background-color: #3c65ab;
    &:hover {
        background: #6f97db;
    }
`;

const HeaderPin = styled.div `
    color: #fff;
    margin-left: 0.5rem;
    align-items: center;
    display: flex;
`;

const Header = styled.div `
    color: white;
    background-color: #678bca;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    position: absolute;
    width: 99.1%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const TableFilters = styled.div `
    margin-top: 1rem;
    margin-right: 1rem;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
`;

const MaindataContainer = styled.div `
    z-index: 10;
    position: absolute;
    max-width: 99vw;
    margin-top: 96px;
    padding-left: 22px;
    padding-right: 28px;
    width: 97%;
    max-height: 93%;
`;

const RowCheckbox = styled.td `
    background-color: #fff;
    background-clip: border-box;
    border-radius: 0.25rem;
    margin: 0;
    align-content: center;
    display: flex;
    flex-wrap: wrap;
    min-height: 52px;
    padding-left: 0.25rem;
`;

const FirstCell = styled.span `
    border-left: 6px solid skyblue;
`;

const TableRow = styled.tr `
    max-height: 54px;
    border-radius: 4px;
    font-weight: 400;
    text-transform: capitalize !important;
    margin-top: 0.5rem !important;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #fff;
    background-clip: border-box;
    border-radius: 0.25rem;
`;

const TableRowCell = styled.td `
    align-content: center !important;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 260px;
    position: relative;
    width: 260px;
    display: flex;
    flex-wrap: wrap;
    min-height: 52px;
    justify-content: center;
    background-color: #fff;
    &:hover {
        background: #e8eff2;
    }
`;

const SwitchText = styled.div `
    color: #fff !important;
    font-weight: 500;
`;

const SwitchDrawerText = styled.div `
    color: #000 !important;
    font-weight: 500;
`;

const TableFilterIcon = styled.span `
    cursor: pointer;
`;

const FilterContent = styled.div `
    width: 37vw;
    padding: 1.5rem;
`;

const FilterHeaderPaper = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FilterContentBlock = styled.div `
    border-top: 6px solid lightgreen !important;
    padding: 1rem;
    border-radius: 6px;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
`;

const FilterCell = styled.div `
    padding: 6px;
    width: 15vw;
    text-transform: capitalize;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &:hover {
        background: #b9e2f5;
    }
`;

const FilterFileType = styled.div `
    padding: 6px;
    width: 15vw;
    text-transform: capitalize;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const SelectFileType = styled.div `
    display: flex;
    justify-content: flex-end;
`;

const TableContainer = styled.div `
    display: flex;
    height: 90vh;
`;
//overflow: scroll !important;

const HeaderParent = styled.div `
    font-size: 10px;
`;

const Rows = styled.tbody `
    height: 84vh;
`;

const HeaderData = styled.thead `
    border-radius: 4px;
`;

const HeaderCheck = styled.div `
`;

const SortIcon = styled.div `
    margin-left: 0.5rem;
    align-items: center;
    display: flex;
`;

const CustomTable = styled.table `
    width: 100%;
`;

export default {
    TableHeader,
    Headername,
    CompareIcon,
    HeaderCell,
    HeaderPin,
    Header,
    MaindataContainer,
    RowCheckbox,
    FirstCell,
    TableRow,
    TableRowCell,
    TableFilters,
    SwitchText,
    TableFilterIcon,
    FilterContent,
    FilterContentBlock,
    FilterCell,
    FilterHeaderPaper,
    TableContainer,
    HeaderParent,
    SwitchDrawerText,
    Rows,
    HeaderData,
    HeaderCheck,
    SortIcon,
    CustomTable,
    FilterFileType,
    SelectFileType,
};
