import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'react-feather';
import moment from 'moment';
import Loading from '../Loading/';
import './dashboard.css';

// <=========== Graphql ===========>
import { useMutation } from '@apollo/react-hooks';
import { REMOVE_FROM_QUEUE, EDIT_DURATION_QUEUE } from '../../services/graphql/mutation';

const mockData = [
  {
    _id: 1,
    userId: {
      _id: 2,
      image: 'assets/male.png',
      firstName: 'john',
      lastName: 'doe'
    },
    problem: {
      name: 'mock',
      duration: 60,
    },
    duration: 60,
    checkIn: new Date(),

  }
]

export default ({ data, loading, error, refetch, dataDaily, loadingDaily, errorDaily, dataWeekly, loadingWeekly, errorWeekly }) => {

  const [editMode, setEditMode] = useState(false);
  const [newDuration, editNewDuration] = useState(0);
  const handleEditDuration = e => {
    editNewDuration(+(e.target.value).match( RegExp(/\d+/g) ));
  }

  const [removeFromQueue, { loading: loadingRemoveQueue, errorRemoveQueue }] = useMutation(REMOVE_FROM_QUEUE, {
    onCompleted() {
    },
    onError() {
      console.log(errorRemoveQueue);
    },
  });
  
  const [editDurationQueue, { loading: loadingEditDurationQueue, errorEditDurationQueue }] = useMutation(EDIT_DURATION_QUEUE, {
    onError() {
      console.log(errorEditDurationQueue);
    },
  });

  const [statusLayer, setStatusLayer] = useState('Lock');
  
  const handleRemoveQueue = queueId => {
    removeFromQueue({
      variables: {
        token: localStorage.getItem('token'),
        queueId
      }
    })
  };

  const handleEditDurationQueue = _ => {
    editDurationQueue({
      variables: {
        token: localStorage.getItem('token'),
        queueId: editMode,
        duration: newDuration,
      }
    });
    setEditMode(false);
    editNewDuration(0);
  };

  if (loading || loadingRemoveQueue || loadingEditDurationQueue || loadingDaily || loadingWeekly) {
    return (
      <div id="right-dashboard">
        <Loading/>
      </div>
    );
  }

  if (data) {
    refetch();
  }

  if (error || errorRemoveQueue || errorDaily || errorWeekly) {
    return (
      <div id="right-dashboard">
        <p>error :( dashboard</p>
      </div>
    );
  }

  console.log(dataWeekly.getWeeklyPercentage.percentage >= 0, dataWeekly.getWeeklyPercentage);

  return (
    <div id="right-dashboard">
      <div id="dashboard-box-btn">
        <button id="lock-screen" onClick={_ => setStatusLayer(statusLayer === 'Lock' ? 'Open' : 'Lock')}>{statusLayer} Screen</button>
      </div>
      {statusLayer === 'Open' ?
        <Loading></Loading> :
        <>
          <div id="total-customer">
            <div id="head-total-customer">
              <span>Daily Customers</span>
            </div>
            <div id="body-total-customer">
              <div id="body-total-exp">
                {dataDaily.getDailyPercentage.percentage >= 0 ? 
                  <ArrowUp /> : 
                  <ArrowDown color="rgb(255, 79, 79)" />
                }
                <h3>{dataDaily.getDailyPercentage.currentDay} people</h3>
                <div className="flex-spacer"></div>
                <div id="percen-total">
                  <p>{dataDaily.getDailyPercentage.percentage}%</p>
                </div>
              </div>
              <div id="progress-bar">
                {dataDaily.getDailyPercentage.percentage >= 0 ? 
                  <div id="progress" style={{ width: Math.abs(dataDaily.getDailyPercentage.percentage)+'%' }}></div>
                  : 
                  <div id="progress-red" style={{ width: 100 - Math.abs(dataDaily.getDailyPercentage.percentage)+'%' }}></div>
                }
              </div>
            </div>
          </div>
          
          <div id="total-customer">
            <div id="head-total-customer">
              <span>Weekly Customers</span>
            </div>
            <div id="body-total-customer">
              <div id="body-total-exp">
                { dataWeekly.getWeeklyPercentage.percentage >= 0 ?
                  <ArrowUp /> :
                  <ArrowDown color="rgb(255, 79, 79)" />
                }
                <h3>{dataWeekly.getWeeklyPercentage.currentWeek} people</h3>
                <div className="flex-spacer"></div>
                <div id="percen-total">
                  <p>{dataWeekly.getWeeklyPercentage.percentage}%</p>
                </div>
              </div>
              <div id="progress-bar">
                <div id="progress" style={{ width: Math.abs(dataWeekly.getWeeklyPercentage.percentage)+'%' }}></div>
              </div>
            </div>
          </div>

          <div id="customer-box-list">
            <div id="header-recent-customer">
              <div id="just-block"></div>
              <span>Recent Customers</span>
            </div>
            <div id="body-customer-list">
              {data.findCompanyById.queue.map(el => (
                <div id="customer-list" key={el._id}>
                  <div id="customer-pic">
                    <img src={el.userId.image || 'assets/male.png'} alt="profile"/>
                  </div>
                  <div id="customer-desc">
                    <h5>{`${el.userId.firstName} ${el.userId.lastName}`}</h5>
                    <p>{el.problem.name}</p>
                  </div>
                  <div className="flex-spacer"></div>
                  <div id="queue-duration">
                    {editMode === el._id ?
                      <input id="duration-input" onChange={handleEditDuration} type="text" value={newDuration} /> :
                    <>
                      <div id="circle-duration"></div>
                      <p>{el.duration} Minutes</p>
                    </>
                    }
                  </div>
                  <div id="customer-time">
                    <div id="circle"></div>
                    <p>{moment(el.checkIn).format('LT')}</p>
                  </div>
                  <div id="fix-spacer"></div>
                  <div id="button-action">
                    {editMode === el._id ? 
                      <>
                        <button id="btn-late" onClick={_ => handleEditDurationQueue()}>Done</button>
                        <button id="btn-cancel-edit-duration" onClick={_ => setEditMode(false)}>Cancel</button>
                      </> : 
                      <>
                        <button id="btn-late" onClick={_ => {
                          setEditMode(el._id);
                        }}>Edit</button>
                        <button id="btn-done" onClick={_ => handleRemoveQueue(el._id)}>Done</button>
                      </>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      }
    </div>
  );
};