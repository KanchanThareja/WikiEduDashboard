import { sortByKey } from '../utils/model_utils';
import { RECEIVE_ASSIGNMENTS, ADD_ASSIGNMENT, DELETE_ASSIGNMENT, UPDATE_ASSIGNMENT } from '../constants';

const initialState = {
  assignments: [],
  sortKey: null,
  loading: true
};

const SORT_DESCENDING = {};

export default function assignments(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ASSIGNMENTS: {
      const course = action.data.course;
      const dataAssignments = course ? course.assignments : [];
      // Initial sorting by article title
      const sortedModel = sortByKey(dataAssignments, 'article_title', state.sortKey, SORT_DESCENDING.article_title);
      return {
        assignments: sortedModel.newModels,
        sortKey: sortedModel.newKey,
        loading: false
      };
    }
    case ADD_ASSIGNMENT: {
      const newAssignment = action.data;
      const updatedAssignments = [...state.assignments, newAssignment];
      return { ...state, assignments: updatedAssignments };
    }
    case DELETE_ASSIGNMENT: {
      const updatedAssignments = state.assignments.filter(({ id }) => id !== action.data.assignmentId);
      return { ...state, assignments: updatedAssignments };
    }
    case UPDATE_ASSIGNMENT: {
      const updatedAssignment = action.data.assignment;
      const nonupdatedAssignments = state.assignments.filter(({ id }) => id !== action.data.assignmentId);
      return { ...state, assignments: [...nonupdatedAssignments, updatedAssignment] };
    }
    default:
      return state;
  }
}
