define(["workflow-diagram"], function () {
    var DIAGRAM_GRID_SIZE = 13;
    var PARALLEL_STEP_INNER_STEP_HEIGHT = 52;
    var PARALLEL_STEP_INNER_STEP_WIDTH = 104;
    var PARALLEL_STEP_HORIZONTAL_INTER_STEP_PADDING = 12;
    var PARALLEL_STEP_VERTICAL_INTER_STEP_PADDING = 26;
    var WORKFLOW_IMAGE_DIR = "img/workflows";

    var ENUMS = {
        CategoryDataType: {
            Filter: {
                ALL: -1
            },
            NONE: 0,
            INT: 1,
            FLOAT: 2,
            STRING: 4,
            DATETIME: 5,
            ENUM: 6,
            USER: 7
        },

        CellPart: {
            NONE: -2,
            ALL: -1,
            X_VALUE: 0,
            I_VALUE: 1,
            ANNOTATION: 2
        },

        GUITaskType: {
            CHOICE: 0,
            DOCUMENT: 1,
            EMBEDDED: 2,
            INSTRUCTIONS: 3,
            MODULE: 4,
            QBP: 5,
            WEB: 6,
            MOVE_PORTFOLIO: 7,
            UPDATE_FIELD: 8
        },

        LinkType: {
            SCORECARD: 1,
            FORM: 2,
            ALIGNMENT: 3,
            DASHBOARD: 4,
            WORKBOOK: 5,
            DOCUMENT: 6,
            TEXT: 7,
            URL: 8,
            ADDON: 9,
            FORM_NEW_ITEM: 10,
            FORM_NEW_CAND: 11,
            FORM_NEW_PF: 12,
            FORM_NEW_SPF: 13,
            MYPORTFOLIOS_CONTAINER: 14,
            DASHBOARD_NEW_ITEM: 15,
            DASHBOARD_NEW_CAND: 16,
            DASHBOARD_NEW_PF: 17,
            DASHBOARD_NEW_SPF: 18
        },

        ReportedEntityTypeFilter: {
            ALL: -1,
            PORTFOLIOS_ONLY: -2,
            PROJECTS_ONLY: -3,
            NONE: -4,
            SUPERPORTFOLIOS_ONLY: -5,
            PORTFOLIOS_AND_SUPERPORTFOLIOS: -6
        },

        UserRoleType: {
            FIELD: 1,
            USER: 2,
            USER_GROUP: 3,
            INHERITED: 4,
            EMPTY: 5,
            SAME_AS_EMBEDDED_WF: 6
        },

        UserTask: {
            InstantiationRuleType: {
                NONE: 1,
                ONE_LEVEL_BELOW: 2,
                TWO_LEVELS_BELOW: 3,
                THREE_LEVELS_BELOW: 4,
                CUSTOM: 5,
                ALL: 6
            },

            SignOffType: {
                MINIMAL_DIALOG: 1,
                DIALOG_WITH_COMMENTS_AREA: 2,
                DIALOG_WITH_COMMENTS_AND_PASSWORD_AREAS: 3,
                NO_DIALOG: 4
            }
        },

        Workflow: {
            ErrorHandlingType: {
                STOP: 1,
                OVERRIDE: 2,
                IGNORE: 3
            },

            ScopeType: {
                EMPTY: 1,
                INHERITED: 2,
                SPECIFIC: 3,
                SAME_AS_EMBEDDED_WF: 4,
                NEW: 5
            },

            StepType: {
                TASKS: 1,
                AUTOMATIC_CONDITION: 2,
                MANUAL_CONDITION: 3,
                PARALLEL: 4,
                INITIAL: 5,
                FINAL: 6
            },

            TransitionLogicType: {
                EMPTY: 1,
                SINGLE_TARGET_AUTO: 2,
                MANUAL: 3,
                CATEGORY_EQUALITY: 4,
                RANGES: 5
            },

            TransitionRuleType: {
                INTEGER: 1,
                STRING: 2,
                INTEGER_RANGE: 3,
                DOUBLE_RANGE: 4,
                DATETIME_RANGE: 5
            }
        }
    };

    return {
        Diagram: {
            CENTER_ANCHOR_ELEMENT_ID: "centerAnchor",
            GRID_SIZE: DIAGRAM_GRID_SIZE,
            CANVAS_HEIGHT: 820 * DIAGRAM_GRID_SIZE,
            CANVAS_WIDTH: 800 * DIAGRAM_GRID_SIZE,
            WORKFLOW_IMAGE_PATH: WORKFLOW_IMAGE_DIR + "/%0",

            SelectedObjectType: {
                NONE: 0,
                PARALLEL_STEP_TRACK_LINE_SEGMENT: 1,
                STEP: 2,
                TRANSITION_INDICATOR: 3,
                TRANSITION_OPTION: 4
            }
        },

        Step: {
            ELEMENT_ID: "step_%0",
            NAME_ID: "step_%0_name",
            SHAPE_ID: "step_%0_shape"
        },

        ConditionStep: {
            OUTGOING_CONNECTION_POINT_OFFSETS: [
            // 0 options
                [],
            // 1 option
                [0],
            // 2 options
                [-2, 2],
            // 3 options
                [-4, 0, 4],
            // 4 options
                [-6, -2, 2, 6],
            // 5 options
                [-8, -4, 0, 4, 8]
            ],
            // Measured in grid cells
            HEIGHT: 6,
            // Measured in grid cells
            WIDTH: 6
        },

        FinalStep: {
            // Measured in grid cells
            HEIGHT: 4,
            // Measured in grid cells
            WIDTH: 8
        },

        InitialStep: {
            // Measured in grid cells
            HEIGHT: 4,
            // Measured in grid cells
            WIDTH: 8
        },

        ParallelStep: {
            TRACK_WIDTH: 114,
            VERTICAL_INTER_STEP_PADDING: PARALLEL_STEP_VERTICAL_INTER_STEP_PADDING,
            HORIZONTAL_STEP_SPACE: PARALLEL_STEP_INNER_STEP_WIDTH + PARALLEL_STEP_HORIZONTAL_INTER_STEP_PADDING,
            VERTICAL_STEP_SPACE: PARALLEL_STEP_INNER_STEP_HEIGHT + PARALLEL_STEP_VERTICAL_INTER_STEP_PADDING,
            VERTICAL_LAST_STEP_PADDING: 66,
            MINIMAL_TRACK_HEIGHT_BASED_ON_STEPS: 1,
            HEADER_HEIGHT: 50,
            TRACK_LINE_WIDTH: 7,
            TRACK_LINE_HANDLE_HEIGHT: 7,
            // Measured in grid cells
            OUTGOING_CONNECTION_POINT_BY_NUMBER_OF_TRACKS: [
                [],
                [],
                [0.5, 1, 0, 1],
                [0.49152, 1, 0, 1],
                [0.5, 1, 0, 1],
                [0.4932, 1, 0, 1]
            ],
            // Measured in grid cells
            WIDTH_BY_NUMBER_OF_TRACKS: [
                0,
                0,
                18,
                27,
                36,
                45
            ],
            TRACK_NAME_ID: "step_%0_track%1_name",
            LANES_BG_ID: "step_%0_lanesBackground",
            LINE_SEGMENT_ID: "step_%0_line_%1_%2",
            LINE_SEGMENT_GRAPHICS_ID: "step_%0_graphics_%1_%2",
            LINE_SEGMENT_HANDLE_ID: "step_%0_handle_%1_%2"
        },

        TaskStep: {
            TASK_ICON_ID: "step_%0_task%1_icon",
            TASK_ELLIPSIS_ID: "step_%0_tasks_ellipsis",
            REGULAR_TASK_ICON_TEMPLATE: WORKFLOW_IMAGE_DIR + "/icons/%0.png",
            ITERATIVE_TASK_ICON_TEMPLATE: WORKFLOW_IMAGE_DIR + "/icons/%0-Iterative.png",
            MAX_TASK_RELATED_ICONS: 4,
            // Measured in grid cells
            HEIGHT: 4,
            // Measured in grid cells
            WIDTH: 8
        },

        TransitionOption: {
            SCOPE_ID: "step_%0_transitionOption_%1",
            INDICATOR_ID: "step_%0_transitionIndicator_%1",
            CONNECTION_PAINT_STYLE: {
                lineWidth: 1,
                strokeStyle: "#4d83b6",
                outlineColor: "#e9edf1",
                outlineWidth: 1
            },
            SELECTED_OUTLINE_COLOR: "#00ffff",
            SOURCE_ENDPOINT_PAINT_STYLE: {
                fillStyle: "#ffffff",
                outlineWidth: 1,
                outlineColor: "#4d83b6"
            },
            SELECTED_SOURCE_ENDPOINT_FILL_COLOR: "#00ffff",
            ENDING_ARROW_ID: "step_%0_transitionOption_%1_endingArrow"
        },

        StepLocationType: {
            NONE: 0,
            TRACK: 1,
            WORKFLOW: 2
        },

        GUITaskType: ENUMS.GUITaskType,

        ZoomLevel: {
            PERCENT100: 0,
            PERCENT75: 1,
            PERCENT50: 2,
            PERCENT25: 3,
            PERCENT15: 4
        },

        Workflow: {
            WorkflowStatus: {
                PENDING: 1,
                EXECUTING: 2,
                FINISHED: 3,
                STOPPED: 4,
                HALTED: 5
            },

            StepStatus: {
                EXECUTING: 1,
                FINISHED: 2
            },

            TrackStatus: {
                EXECUTING: 1,
                FINISHED: 2
            },

            StepType: ENUMS.Workflow.StepType,

            TransitionLogicType: ENUMS.Workflow.TransitionLogicType,

            VerificationErrorLevel: {
                ERROR: 1,
                WARNING: 2
            },

            VerificationErrorType: {
                GENERAL: 1,
                TASK_BASED: 2,
                STEP_BASED: 3
            },

            ErrorHandlingType: ENUMS.Workflow.ErrorHandlingType,

            SearchMatchLevel: {
                NO_MATCH: 0,
                PERFECT: 1,
                PARTIAL: 2
            },

            SearchResultType: {
                STEP: 1,
                TASK: 2,
                TRACK: 3,
                TRANSITION_OPTION: 4
            },

            LeftPaneViewType: {
                PERFORMER: 1,
                MANAGER: 2,
                ALL: 3
            },

            AltManagersType: {
                NONE: 1,
                ALL_USERS: 2,
                SPECIFIC_USER_GROUP: 3
            },

            ScopeType: ENUMS.Workflow.ScopeType,

            TransitionRuleType: ENUMS.Workflow.TransitionRuleType,

            InstanceInstansiationType: {
                BY_USER: 1,
                BY_PARENT_WORKFLOW_INSTANCE: 2,
                BY_ALERT: 3
            },

            LeftPaneFilterType: {
                ALL: 1,
                ONLY_OPEN: 2
            },

            DurationUnitType: {
                UNLIMITED: 0,
                DAYS: 1,
                WEEKS: 2,
                MONTHS: 3
            }
        },

        CellPart: ENUMS.CellPart,

        CategoryDataType: ENUMS.CategoryDataType,

        UserTask: {
            TaskInstanceStatus: {
                EXECUTING: 1,
                FINISHED: 2
            },

            AssignmentStatus: {
                IN_USER_TO_DO_LIST: 1,
                FINISHED: 2
            },

            AssignmentType: {
                REGULAR: 1,
                ERROR: 2
            },

            InstantiationRuleType: ENUMS.UserTask.InstantiationRuleType,

            TaskType: {
                PROSIGHT_LINK: 1,
                RUN_QBP: 2,
                EMBEDDED_WORKFLOW: 3,
                FIRE_EVENT: 4,
                CHOICE: 5,
                STEP_START_FAILURE_REASSIGNED: 6,
                UPDATE_CELL: 7,
                MOVE_PORTFOLIO: 8
            },

            ExecutionMode: {
                SYNC: 1,
                ASYNC: 2
            },

            SignOffType: ENUMS.UserTask.SignOffType,

            QBPPermissionsType: {
                WORKFLOW_INSTANCE_RUN_AS: 1,
                QBP_RUN_AS: 2
            },

            QBPRefreshPriority: {
                NONE: 0,
                NORMAL_PRIORITY: 1,
                HIGH_PRIORITY: 2
            },

            EmbeddedWorkflowPermissionsType: {
                WORKFLOW_INSTANCE_RUN_AS: 1,
                EMBEDDED_WORKFLOW_RUN_AS: 2
            },

            InstantiaionFailureCode: {
                PERFORMER_NOT_RESOLVED: 1,
                PORTFOLIO_NOT_QBP: 2,
                SECURITY_VIOLATION: 3,
                WORKFLOW_MANAGER_NOT_ALLOWED: 4,
                WORKFLOW_DELETED: 5,
                WORKFLOW_DISABLED: 6,
                WORKFLOW_INSTANCE_MAX_DEPTH_EXCEEDED: 7,
                WORKFLOW_FAILS_VERIFICATION: 8,
                PORTFOLIO_MOVE_ILLEGAL: 9,
                ILLEGAL_CELL_UPDATE: 10,
                SCOPE_DELETED: 11,
                PERFORMER_DELETED: 12,
                SYNCHRONOUS_EMBEDDED_WORKFLOW_FAULTED: 13,
                SYNCHRONOUS_EMBEDDED_WORKFLOW_STOPPED: 14,
                NO_RUN_AS_USER_ID: 15,
                TRACK_FAULTED: 16,
                NO_SCOPE: 17,
                SCOPE_DOES_NOT_FIT_MODULE: 18,
                EMBEDDED_MANAGER_NOT_RESOLVED: 19,
                STEP_MANAGER_NOT_RESOLVED: 20
            },

            UpdateFieldModeType: {
                FROM_FIELD: 1,
                FROM_CONSTANT: 2
            },

            UpdateCellCategoryDirection: {
                TARGET: 1,
                SOURCE: 2
            }
        },

        LinkType: ENUMS.LinkType,

        ReportedEntityTypeFilter: ENUMS.ReportedEntityTypeFilter,

        UserRoleType: ENUMS.UserRoleType,

        DiagramToolbar: {
            State: {
                CANVAS_SELECTED: 0,
                FINAL_STEP_SELECTED: 1,
                INITIAL_STEP_SELECTED: 2,
                PARALLEL_STEP_TRACK_LINE_SEGMENT_SELECTED: 3,
                READ_ONLY: 4,
                STEP_SELECTED: 5,
                TRANSITION_OPTION_SELECTED: 6,
                TRANSITION_INDICATOR_SELECTED: 7
            }
        },

        Events: {
            ADD_TASK_STEP_BUTTON_CLICKED: "workflowEditor:addTaskStepClicked",
            ADD_MANUAL_DECISION_STEP_BUTTON_CLICKED: "workflowEditor:addManualDecisionStepClicked",
            ADD_AUTOMATIC_DECISION_STEP_BUTTON_CLICKED: "workflowEditor:addAutomaticDecisionStepClicked",
            ADD_PARALLEL_STEP_BUTTON_CLICKED: "workflowEditor:addParallelStepClicked",
            DELETE_BUTTON_CLICKED: "workflowEditor:deleteClicked",
            STEP_MOUSE_DOWN: "workflowEditor:stepMouseDown",
            STEP_DROPPED: "workflowEditor:stepDropped",
            STEP_CLICKED: "workflowEditor:stepClicked",
            TRACK_LINE_SEGMENT_CLICKED: "workflowEditor:trackLineSegmentClicked",
            CANVAS_CLICKED: "workflowEditor:canvasClicked",
            TRANSITION_INDICATOR_CLICKED: "workflowEditor:transitionIndicatorClicked",
            TRANSITION_OPTION_CLICKED: "workflowEditor:transitionOptionClicked",
            WORKFLOW_NAME_UPDATED: "workflowEditor:workflowNameUpdated",
            STEP_NAME_UPDATED: "workflowEditor:stepNameUpdated",
            STEP_TASKS_UPDATED: "workflowEditor:stepTasksUpdated",
            DATA_UPDATED: "workflowEditor:dataUpdated"
        },

        DataStructures: {
            DefaultStep: JSON.stringify({
                Column: 0,
                Description: "",
                DirectPredecessorIDs: [],
                ErrorHandlingType: ENUMS.Workflow.ErrorHandlingType.STOP,
                ID: 0,
                Manager: {
                    ID: null,
                    Type: ENUMS.UserRoleType.INHERITED
                },
                Name: "",
                Row: 0,
                Scope: {
                    ObjectID: null,
                    Type: ENUMS.Workflow.ScopeType.INHERITED
                },
                Tasks: null,
                Tracks: null,
                Transition: null,
                Type: ENUMS.Workflow.StepType.TASKS
            }),
            DefaultTask: JSON.stringify({
                FieldToUpdate: null,
                Choice: null,
                Description: "",
                EmbeddedWorkflow: null,
                Manager: {
                    ID: null,
                    Type: ENUMS.UserRoleType.INHERITED
                },
                Link: {
                    AttachmentID: null,
                    FormID: null,
                    TabID: null,
                    Type: ENUMS.LinkType.TEXT,
                    URI: ""
                },
                Name: "",
                Scope: {
                    ObjectID: null,
                    Type: ENUMS.Workflow.ScopeType.INHERITED
                },
                ScopeRule: {
                    ScopeAppliesTo: ENUMS.ReportedEntityTypeFilter.ALL,
                    ScopeDepth: null,
                    ScopeDepthType: ENUMS.UserTask.InstantiationRuleType.NONE
                },
                SignOffType: ENUMS.UserTask.SignOffType.NO_DIALOG,
                Type: ENUMS.GUITaskType.MODULE,
                UseFormContextForWorkflow: false
            }),
            DefaultTrack: JSON.stringify({
                Name: "",
                Steps: []
            }),
            DefaultTransition: JSON.stringify({
                CategoryTransition: {
                    CategoryDataType: ENUMS.CategoryDataType.NONE,
                    CategoryID: null,
                    CellPart: ENUMS.CellPart.X_VALUE,
                    DataVersionID: null,
                    DataVersionRawDate: "",
                    TreatNoValueAsZero: true
                },
                Options: [],
                Rules: [],
                Type: ENUMS.Workflow.TransitionLogicType.EMPTY
            }),
            DefaultTransitionOption: JSON.stringify({
                IsDefaultOption: false,
                Label: "",
                TargetStepID: null
            }),
            DefaultTransitionRule: JSON.stringify({
                DateTimeRangeTransitionRule: {
                    LowerLimit: null,
                    UpperLimit: null
                },
                DoubleRangeTransitionRule: {
                    LowerLimit: null,
                    UpperLimit: null
                },
                ID: 0,
                IntegerRangeTransitionRule: {
                    LowerLimit: null,
                    UpperLimit: null
                },
                IntegerTransitionRule: {
                    Value: null
                },
                StringTransitionRule: {
                    Value: ""
                },
                TransitionOptionID: null,
                Type: ENUMS.Workflow.TransitionRuleType.STRING
            })
        }
    };
});