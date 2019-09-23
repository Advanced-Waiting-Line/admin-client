import React, { useState, useEffect } from 'react';
import { Plus, Minus, Edit, Trash, CheckSquare, X } from 'react-feather';

// <=========== Graphql ===========>
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import { STARTER_DASHBOARD } from '../../services/graphql/query';
import { ADD_PROBLEM_LIST } from '../../services/graphql/mutation';
import './problemList.css';

export default ({ data, pushNewProb }) => {

  const [addList, setAddList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editDuration, setEditDuration] = useState(0);
  const handleEditDuration = e => {
    setEditDuration(+(e.target.value).match( RegExp(/\d+/g) ));
  }

  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDuration, setNewDuration] = useState(0);
  const handleNewDuration = e => {
    setNewDuration(+(e.target.value).match( RegExp(/\d+/g) ));
  }

  const populateData = ({ _id, name, description, duration }) => {
    setEditMode(_id);
    setEditName(name);
    setEditDesc('Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptatum amet velit explicabo, nulla tempore nesciunt!');
    setEditDuration(duration);
  }

  const [addProblemList, { loading: loadingAdd, error: errorAdd }] = useMutation(ADD_PROBLEM_LIST, {
    onCompleted() {
      setAddList(false);
    },
    onError() {
    },
    update(cache, { data: { createProblem } } ) {
      // cache in parent not solve with this fn
      pushNewProb(createProblem);
      // <<<< special fn >>>>

      const data = cache.readQuery({ query: STARTER_DASHBOARD, variables: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDg4NDY1NjAyZjY1NTExNmI1MTIzOWUiLCJlbWFpbCI6ImNvbXBhbnkxQG1haWwuY29tIiwiaWF0IjoxNTY5MjEzNTc4LCJleHAiOjE1Njk0Mjk1Nzh9.QZZ1gXJwziTFUCiTWMGKCn1Vkfy2fBgZ_n117g814jk",
        companyId: "5d88465602f655116b51239e"
      } });

      cache.writeQuery({
        query: STARTER_DASHBOARD,
        data: { getTodayLog: data.getTodayLog, getCompanyProblem: (data.getCompanyProblem).concat([createProblem]) }
      });
    }
  });

  const handleAdd = () => {
    addProblemList({
      variables: {
        // token: localStorage.getItem('token'),
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDg4NDY1NjAyZjY1NTExNmI1MTIzOWUiLCJlbWFpbCI6ImNvbXBhbnkxQG1haWwuY29tIiwiaWF0IjoxNTY5MjEzNTc4LCJleHAiOjE1Njk0Mjk1Nzh9.QZZ1gXJwziTFUCiTWMGKCn1Vkfy2fBgZ_n117g814jk",
        name: newName,
        description: newDesc,
        duration: newDuration,
      }
    })
    .catch(console.log);
  }

  return (
    <div id="right-problem-list">
      <button id="add-problem" onClick={_ => addList ? setAddList(false) : setAddList(true)}>
        {addList ? 
          <Minus size="20" color="white"/> :
          <Plus size="20" color="white"/>
        }
        Problem List
      </button>
      {addList &&
        <div id="add-problem-form">
          <div id="name-problem">
            <p>Problem</p>
            <input type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
          </div>
          <div id="desc-problem">
            <p>Duration</p>
            <input type="text" value={newDuration} onChange={handleNewDuration}/>
          </div>
          <div id="duration-problem">
            <p>Desc</p>
            <textarea type="text" spellCheck="false" value={newDesc} onChange={e => setNewDesc(e.target.value)}/>
          </div>
          <div id="problem-box-btn">
            <div className="flex-spacer"></div>
            <button id="cancel-problem-btn" onClick={_ => setAddList(false)}>Cancel</button>
            <button id="add-problem-btn" onClick={_ => handleAdd()}>Add</button>
          </div>
        </div>
      }
      <div id="problem-list-box">
        <div id="problem-list-head-box">
          <div className="problem-list-head">
            <span>No.</span>
          </div>
          <div className="problem-list-head">
            <span>Problem</span>
          </div>
          <div className="problem-list-head">
            <span>Desc</span>
          </div>
          <div className="problem-list-head">
            <span>Time Required</span>
          </div>
          <div className="problem-list-head">
            <span>Actions</span>
          </div>
        </div>
        {data.map((el, i) => (
          <div className="problem-list" key={el._id}>
            <div className="problem-list-num">
              <span>{ i+1 }</span>
            </div>
            <div className="problem-list-name">
              {editMode == el._id ? 
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)}/> : 
                <span>{ el.name }</span>
              }
            </div>
            <div className="problem-list-desc">
              {editMode == el._id ? 
                <textarea spellCheck="false" value={editDesc} onChange={e => setEditDesc(e.target.value)} /> :       
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptatum amet velit explicabo, nulla tempore nesciunt!</p>
              }
            </div>
            <div className="problem-list-time">
              {editMode == el._id ? 
                <input value={editDuration} onChange={handleEditDuration}/> :
                <span>{ el.duration } Minutes</span>
              }
            </div>
            <div className="problem-list-actions">
              {editMode == el._id ? 
                <>
                  <button className="problem-edit" onClick={_ => {populateData(el)}}>
                    <CheckSquare size="20" color="white" />
                  </button>
                  <button className="problem-del" onClick={_ => setEditMode(false)}>
                    <X size="20" color="white" />
                  </button>
                </> : 
                <>
                  <button className="problem-edit" onClick={_ => {populateData(el)}}>
                    <Edit size="20" color="white" />
                  </button>
                  <button className="problem-del">
                    <Trash size="20" color="white" />
                  </button>
                </>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}