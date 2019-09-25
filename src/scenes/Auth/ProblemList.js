import React, { useState } from 'react';
import { Plus, Minus, Edit, Trash, CheckSquare, X } from 'react-feather';
import Loading from '../Loading/';
import Modal from '../Modal/';
import './problemList.css';

// <=========== Graphql ===========>
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANY_PROBLEM } from '../../services/graphql/query';
import { ADD_PROBLEM_LIST, UPDATE_PROBLEM, DELETE_PROBLEM } from '../../services/graphql/mutation';

// <=========== FIREBASE ===========>
import db from '../../services/api/firestore';

export default _ => {
  
  const { loading, error, data, refetch } = useQuery(GET_COMPANY_PROBLEM, {
    variables: {
      companyId: localStorage.getItem('ccid'),
    }
  });
  
  db.collection('awansub')
    .onSnapshot(_ => {
      refetch();
      console.log('sub problem');
    });

  const [targetDel, setTargetDel] = useState('');
  const [showModal, setShowModal] = useState(false);
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
    setEditMode(false);
    setEditMode(_id);
    setEditName(name);
    setEditDesc(description);
    setEditDuration(duration);
  }

  const [addProblemList, { loading: loadingAdd, error: errorAdd }] = useMutation(ADD_PROBLEM_LIST, {
    onCompleted() {
      setAddList(false);
      setNewName('');
      setNewDesc('')
      setNewDuration(0);
    },
    onError() {
      console.log(errorAdd);
    },
    update(cache, { data: { createProblem } } ) {
      const { getCompanyProblem } = cache.readQuery({ query: GET_COMPANY_PROBLEM, variables: {
        companyId: localStorage.getItem('ccid'),
      } });
      
      cache.writeQuery({
        query: GET_COMPANY_PROBLEM,
        variables: {
          companyId: localStorage.getItem('ccid'),
        },
        data: { getCompanyProblem: getCompanyProblem.concat([createProblem]) }
      });


    }
  });

  const [updateProblem, { loading: loadingEdit, error: errorEdit }] = useMutation(UPDATE_PROBLEM, {
    update(cache, { data: { updateProblem } } ) {
      const { getCompanyProblem } = cache.readQuery({ query: GET_COMPANY_PROBLEM, variables: {
        companyId: localStorage.getItem('ccid'),
      } });
      
      cache.writeQuery({
        query: GET_COMPANY_PROBLEM,
        variables: {
          companyId: localStorage.getItem('ccid'),
        },
        data: { getCompanyProblem: getCompanyProblem.map(el => {
          if (el._id === updateProblem._id) {
            return updateProblem;
          }
          return el;
        }) }
      });
    }
  });
  
  const [deleteProblem, { loading: loadingDel, error: errorDel }] = useMutation(DELETE_PROBLEM, {
    update(cache, { data: { deleteProblem } } ) {
      const { getCompanyProblem } = cache.readQuery({ query: GET_COMPANY_PROBLEM, variables: {
        companyId: localStorage.getItem('ccid'),
      } });
      
      cache.writeQuery({
        query: GET_COMPANY_PROBLEM,
        variables: {
          companyId: localStorage.getItem('ccid'),
        },
        data: { getCompanyProblem: getCompanyProblem.filter(el => el._id !== deleteProblem._id) }
      });


    }
  });

  const handleAdd = () => {
    addProblemList({
      variables: {
        token: localStorage.getItem('token'),
        name: newName,
        description: newDesc,
        duration: newDuration,
      }
    })
    .catch(console.log);
  }

  const submitEdit = () => {
    updateProblem({
      variables: {
        token: localStorage.getItem('token'),
        problemId: editMode,
        name: editName,
        description: editDesc,
        duration: editDuration,
      }
    })
    console.log(editMode);
    setEditMode(false);
  }
  
  const handleDelete = problemId => {
    setShowModal(true);
    setTargetDel(problemId);
  }
  
  const confirmDel = problemId => {
    deleteProblem({
      variables: {
        token: localStorage.getItem('token'),
        problemId,
      }
    })
    .catch(console.log);
    
    setShowModal(false);
  }

  if (loading || loadingAdd || loadingEdit || loadingDel) {
    return (
      <div id="right-dashboard">
        <Loading/>
      </div>
    );
  }

  if (error || errorAdd || errorEdit || errorDel) {
    return (
      <div id="right-dashboard">
        <p>error :( Problem</p>
      </div>
    );
  }

  return (
    <div id="right-problem-list">
      {showModal && 
        <Modal targetId={targetDel} confirm={confirmDel} show={setShowModal} />
      }
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
        {data.getCompanyProblem.map((el, i) => (
          <div className="problem-list" key={el._id}>
            <div className="problem-list-num">
              <span>{ i+1 }</span>
            </div>
            <div className="problem-list-name">
              {editMode === el._id ? 
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)}/> : 
                <span>{ el.name }</span>
              }
            </div>
            <div className="problem-list-desc">
              {editMode === el._id ? 
                <textarea spellCheck="false" value={editDesc} onChange={e => setEditDesc(e.target.value)} /> :       
                <p>{el.description}</p>
              }
            </div>
            <div className="problem-list-time">
              {editMode === el._id ? 
                <input value={editDuration} onChange={handleEditDuration}/> :
                <span>{ el.duration } Minutes</span>
              }
            </div>
            <div className="problem-list-actions">
              {editMode === el._id ? 
                <>
                  <button className="problem-edit" onClick={_ => submitEdit()}>
                    <CheckSquare size="20" color="white" />
                  </button>
                  <button className="problem-del" onClick={_ => setEditMode(false)}>
                    <X size="20" color="white" />
                  </button>
                </> : 
                <>
                  <button className="problem-edit" onClick={_ => populateData(el)}>
                    <Edit size="20" color="white" />
                  </button>
                  <button className="problem-del" onClick={_ => handleDelete(el._id)}>
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