define(["underscore"], function (_) {
    "use strict";

    return {
        post: function (json) {
            return "";
        },

        get: function () {
            return {
                "AlternativeManagers": {
                    "GroupID": null,
                    "Type": 1
                },
                "AuthorizingUserCanAccessAllData": false,
                "AuthorizingUserID": null,
                "Description": "Workflow Description",
                "HasInstances": false,
                "ID": 1,
                "IsEnabled": true,
                "Manager": {
                    "ID": 2,
                    "Type": 2
                },
                "Name": "Workflow 1",
                "OwnerID": 1,
                "Scope": {
                    "ObjectID": 4456,
                    "Type": 1
                },
                "Duration": {
                    "Amount": 3,
                    "Unit": 2
                },
                "SecurityResult": 317,
                "Steps": {
                    "1": {
                        "ID": 1,
                        "Column": 398,
                        "Row": 1,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Start",
                        "Description": "The good start!",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 5,
                        "ErrorHandlingType": 2,
                        "Tasks": null,
                        "Tracks": null,
                        "Transition": {
                            "Options": [{
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 3
                            }],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": []
                    },
                    "13": {
                        "ID": 13,
                        "Column": 393,
                        "Row": 6,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Decision 1",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 3,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -1,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": {
                                "ChoiceLabel": "Which option do you prefer?",
                                "ChoiceOptions": [
                                   "Option 1",
                                   "Option 2"
                                ]
                            },
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Decision",
                            "Description": "System choice task for manual decision Step",
                            "SignOffType": 1,
                            "Type": 0,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                            {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": null
                            },
                            {
                                "IsDefaultOption": false,
                                "Label": "Option 2",
                                "TargetStepID": 14
                            }],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 3
                        },
                        "DirectPredecessorIDs": [
                           12
                        ]
                    },
                    "14": {
                        "ID": 14,
                        "Column": 395,
                        "Row": 18,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Decision 2",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 3,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -1,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": {
                                "ChoiceLabel": "Which option do you prefer?",
                                "ChoiceOptions": [
                                   "Option 1",
                                   "Option 2",
                                   "Option 3"
                                ]
                            },
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Decision",
                            "Description": "System choice task for manual decision Step",
                            "SignOffType": 1,
                            "Type": 0,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 2",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 3",
                                "TargetStepID": 15
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 3
                        },
                        "DirectPredecessorIDs": [
                           13
                        ]
                    },
                    "15": {
                        "ID": 15,
                        "Column": 399,
                        "Row": 30,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Decision 3",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 3,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -1,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": {
                                "ChoiceLabel": "Which option do you prefer?",
                                "ChoiceOptions": [
                                   "Option 1",
                                   "Option 2",
                                   "Option 3",
                                   "Option 4"
                                ]
                            },
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Decision",
                            "Description": "System choice task for manual decision Step",
                            "SignOffType": 1,
                            "Type": 0,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 2",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 3",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 4",
                                "TargetStepID": 16
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 3
                        },
                        "DirectPredecessorIDs": [
                           14
                        ]
                    },
                    "16": {
                        "ID": 16,
                        "Column": 405,
                        "Row": 42,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Decision 4",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 3,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -1,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": {
                                "ChoiceLabel": "Which option do you prefer?",
                                "ChoiceOptions": [
                                   "Option 1",
                                   "Option 2",
                                   "Option 3",
                                   "Option 4",
                                   "Option 5"
                                ]
                            },
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Decision",
                            "Description": "System choice task for manual decision Step",
                            "SignOffType": 1,
                            "Type": 0,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 2",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 3",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 4",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 5",
                                "TargetStepID": 17
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 3
                        },
                        "DirectPredecessorIDs": [
                           15
                        ]
                    },
                    "17": {
                        "ID": 17,
                        "Column": 421,
                        "Row": 6,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Decision 5",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 2,
                        "ErrorHandlingType": 1,
                        "Tasks": null,
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 2",
                                "TargetStepID": 18
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": {
                                "CategoryID": null,
                                "CellPart": 0,
                                "CategoryDataType": 0,
                                "DataVersionID": null,
                                "DataVersionRawDate": null,
                                "TreatNoValueAsZero": true
                            },
                            "Type": 4
                        },
                        "DirectPredecessorIDs": [
                           16
                        ]
                    },
                    "18": {
                        "ID": 18,
                        "Column": 423,
                        "Row": 18,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Decision 6",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 2,
                        "ErrorHandlingType": 1,
                        "Tasks": null,
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 2",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 3",
                                "TargetStepID": 19
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": {
                                "CategoryID": null,
                                "CellPart": 0,
                                "CategoryDataType": 0,
                                "DataVersionID": null,
                                "DataVersionRawDate": null,
                                "TreatNoValueAsZero": true
                            },
                            "Type": 4
                        },
                        "DirectPredecessorIDs": [
                           17
                        ]
                    },
                    "19": {
                        "ID": 19,
                        "Column": 427,
                        "Row": 30,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Decision 7",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 2,
                        "ErrorHandlingType": 1,
                        "Tasks": null,
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 2",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 3",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 4",
                                "TargetStepID": 20
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": {
                                "CategoryID": null,
                                "CellPart": 0,
                                "CategoryDataType": 0,
                                "DataVersionID": null,
                                "DataVersionRawDate": null,
                                "TreatNoValueAsZero": true
                            },
                            "Type": 4
                        },
                        "DirectPredecessorIDs": [
                           18
                        ]
                    },
                    "20": {
                        "ID": 20,
                        "Column": 433,
                        "Row": 42,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Decision 8",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 2,
                        "ErrorHandlingType": 1,
                        "Tasks": null,
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 2",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 3",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 4",
                                "TargetStepID": null
                               },
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 5",
                                "TargetStepID": 21
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": {
                                "CategoryID": null,
                                "CellPart": 0,
                                "CategoryDataType": 0,
                                "DataVersionID": null,
                                "DataVersionRawDate": null,
                                "TreatNoValueAsZero": true
                            },
                            "Type": 4
                        },
                        "DirectPredecessorIDs": [
                           19
                        ]
                    },
                    "21": {
                        "ID": 21,
                        "Column": 460,
                        "Row": 5,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Parallel Step 1",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 4,
                        "ErrorHandlingType": 1,
                        "Tasks": null,
                        "Tracks": [
                           {
                            "Name": "Track 1",
                            "Steps": []
                           },
                           {
                            "Name": "Track 2",
                            "Steps": []
                           }
                        ],
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 22
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           20
                        ]
                    },
                    "22": {
                        "ID": 22,
                        "Column": 465,
                        "Row": 25,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Parallel Step 2",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 4,
                        "ErrorHandlingType": 1,
                        "Tasks": null,
                        "Tracks": [
                           {
                            "Name": "Track 1",
                            "Steps": []
                           },
                           {
                            "Name": "Track 2",
                            "Steps": []
                           },
                           {
                            "Name": "Track 3",
                            "Steps": []
                           }
                        ],
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 23
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           21
                        ]
                    },
                    "23": {
                        "ID": 23,
                        "Column": 474,
                        "Row": 45,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Parallel Step 3",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 4,
                        "ErrorHandlingType": 1,
                        "Tasks": null,
                        "Tracks": [
                           {
                            "Name": "Track 1",
                            "Steps": []
                           },
                           {
                            "Name": "Track 2",
                            "Steps": []
                           },
                           {
                            "Name": "Track 3",
                            "Steps": []
                           },
                           {
                            "Name": "Track 4",
                            "Steps": []
                           }
                        ],
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 24
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           22
                        ]
                    },
                    "24": {
                        "ID": 24,
                        "Column": 487,
                        "Row": 65,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Parallel Step 4",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 4,
                        "ErrorHandlingType": 1,
                        "Tasks": null,
                        "Tracks": [
                           {
                            "Name": "Track 1",
                            "Steps": []
                           },
                           {
                            "Name": "Track 2",
                            "Steps": []
                           },
                           {
                            "Name": "Track 3",
                            "Steps": []
                           },
                           {
                            "Name": "Track 4",
                            "Steps": []
                           },
                           {
                            "Name": "Track 5",
                            "Steps": []
                           }
                        ],
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 25
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           23
                        ]
                    },
                    "25": {
                        "ID": 25,
                        "Column": 523,
                        "Row": 85,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Parallel Step 5",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 4,
                        "ErrorHandlingType": 1,
                        "Tasks": null,
                        "Tracks": [
                           {
                            "Name": "Track 1",
                            "Steps": [
                               {
                                "ID": 27,
                                "Column": 0,
                                "Row": 0,
                                "Scope": {
                                    "ObjectID": null,
                                    "Type": 2
                                },
                                "Manager": {
                                    "ID": null,
                                    "Type": 4
                                },
                                "Name": "Step 11",
                                "Description": "Step11",
                                "Type": 1,
                                "ErrorHandlingType": 1,
                                "Tasks": [],
                                "Tracks": null,
                                "Transition": {
                                    "Options": [
                                       {
                                        "IsDefaultOption": false,
                                        "Label": "",
                                        "TargetStepID": 28
                                       }
                                    ],
                                    "Rules": [],
                                    "CategoryTransition": null,
                                    "Type": 2
                                },
                                "DirectPredecessorIDs": []
                               }
                            ]
                           },
                           {
                            "Name": "Track 2",
                            "Steps": [
                               {
                                "ID": 30,
                                "Column": 0,
                                "Row": 0,
                                "Scope": {
                                    "ObjectID": null,
                                    "Type": 2
                                },
                                "Manager": {
                                    "ID": null,
                                    "Type": 4
                                },
                                "Name": "Step 12",
                                "Description": "",
                                "Type": 1,
                                "ErrorHandlingType": 1,
                                "Tasks": [{
                                    "Scope": {
                                        "ObjectID": null,
                                        "Type": 2
                                    },
                                    "ScopeRule": {
                                        "ScopeAppliesTo": -3,
                                        "ScopeDepth": null,
                                        "ScopeDepthType": 1
                                    },
                                    "Link": {
                                        "FormID": null,
                                        "TabID": null,
                                        "AttachmentID": null,
                                        "URI": null,
                                        "Type": 7
                                    },
                                    "EmbeddedWorkflow": null,
                                    "Choice": null,
                                    "FieldToUpdate": null,
                                    "Manager": {
                                        "ID": null,
                                        "Type": 4
                                    },
                                    "Name": "Task 1",
                                    "Description": "",
                                    "SignOffType": 1,
                                    "Type": 3,
                                    "UseFormContextForWorkflow": false
                                }],
                                "Tracks": null,
                                "Transition": {
                                    "Options": [
                                       {
                                        "IsDefaultOption": false,
                                        "Label": "",
                                        "TargetStepID": 31
                                       }
                                    ],
                                    "Rules": [],
                                    "CategoryTransition": null,
                                    "Type": 2
                                },
                                "DirectPredecessorIDs": []
                               },
                               {
                                "ID": 31,
                                "Column": 0,
                                "Row": 0,
                                "Scope": {
                                    "ObjectID": null,
                                    "Type": 2
                                },
                                "Manager": {
                                    "ID": null,
                                    "Type": 4
                                },
                                "Name": "Step 13",
                                "Description": "",
                                "Type": 1,
                                "ErrorHandlingType": 1,
                                "Tasks": [],
                                "Tracks": null,
                                "Transition": {
                                    "Options": [
                                       {
                                        "IsDefaultOption": false,
                                        "Label": "",
                                        "TargetStepID": 32
                                       }
                                    ],
                                    "Rules": [],
                                    "CategoryTransition": null,
                                    "Type": 2
                                },
                                "DirectPredecessorIDs": []
                               }
                            ]
                           }
                        ],
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 2
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           24
                        ]
                    },
                    "3": {
                        "ID": 3,
                        "Column": 381,
                        "Row": 5,
                        "Scope": {
                            "ObjectID": 4456,
                            "Type": 1
                        },
                        "Manager": {
                            "ID": 3,
                            "Type": 2
                        },
                        "Name": "Step 1",
                        "Description": "The first one",
                        "Duration": {
                            "Amount": 7,
                            "Unit": 2
                        },
                        "Type": 1,
                        "ErrorHandlingType": 3,
                        "Tasks": [],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 4
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           1
                        ]
                    },
                    "12": {
                        "ID": 12,
                        "Column": 381,
                        "Row": 60,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Step 10",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 1,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 1",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 3,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 2",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 3,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 3",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 3,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 4",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 3,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 13
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           11
                        ]
                    },
                    "4": {
                        "ID": 4,
                        "Column": 377,
                        "Row": 11,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Step 2",
                        "Description": "The second!(or, maybe, forth)",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 1,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 2
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 1",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 4,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 2
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 2",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 4,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 2
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 3",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 4,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 5
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           3
                        ]
                    },
                    "5": {
                        "ID": 5,
                        "Column": 373,
                        "Row": 17,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Step 3",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 1,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 2
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 1",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 4,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 2
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 2",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 4,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 6
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 3",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 1,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 6
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           4
                        ]
                    },
                    "6": {
                        "ID": 6,
                        "Column": 369,
                        "Row": 23,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Step 4",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 1,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": "",
                                "Type": 8
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 1",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 6,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 2",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 3,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 4
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": null,
                            "EmbeddedWorkflow": {
                                "ID": null,
                                "EmbeddedWorkflowPermissionsType": 1,
                                "WaitForEmbeddedWorkflow": true
                            },
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 6
                            },
                            "Name": "Task 3",
                            "Description": "",
                            "SignOffType": 0,
                            "Type": 2,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 7
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           5
                        ]
                    },
                    "7": {
                        "ID": 7,
                        "Column": 365,
                        "Row": 29,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Step 5",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 1,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 1",
                            "Description": "",
                            "SignOffType": 0,
                            "Type": 3,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": null,
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": {
                                "SourceFieldID": null,
                                "TargetFieldID": null,
                                "SourceConstant": null,
                                "Mode": 2
                            },
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 2",
                            "Description": "",
                            "SignOffType": 0,
                            "Type": 8,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 1
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 3",
                            "Description": "",
                            "SignOffType": 0,
                            "Type": 3,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 8
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           6
                        ]
                    },
                    "8": {
                        "ID": 8,
                        "Column": 365,
                        "Row": 36,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Step 6",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 1,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 3
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 1",
                            "Description": "",
                            "SignOffType": 0,
                            "Type": 3,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 2
                            },
                            "Link": null,
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": {
                                "SourceFieldID": null,
                                "TargetFieldID": null,
                                "SourceConstant": null,
                                "Mode": 2
                            },
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 2",
                            "Description": "",
                            "SignOffType": 0,
                            "Type": 8,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 2
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 3",
                            "Description": "",
                            "SignOffType": 0,
                            "Type": 3,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 9
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           7
                        ]
                    },
                    "9": {
                        "ID": 9,
                        "Column": 369,
                        "Row": 42,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Step 7",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 1,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 2
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": "",
                                "Type": 8
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 1",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 6,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 2
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 7
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 2",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 3,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 4
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 2
                            },
                            "Link": null,
                            "EmbeddedWorkflow": {
                                "ID": null,
                                "EmbeddedWorkflowPermissionsType": 1,
                                "WaitForEmbeddedWorkflow": true
                            },
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 6
                            },
                            "Name": "Task 3",
                            "Description": "",
                            "SignOffType": 0,
                            "Type": 2,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 10
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           8
                        ]
                    },
                    "10": {
                        "ID": 10,
                        "Column": 373,
                        "Row": 48,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Step 8",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 1,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 2
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 2
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 1",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 4,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 2
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 2
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 2",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 4,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 2
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 6
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 3",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 1,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 11
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           9
                        ]
                    },
                    "11": {
                        "ID": 11,
                        "Column": 377,
                        "Row": 54,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "Step 9",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 1,
                        "ErrorHandlingType": 1,
                        "Tasks": [
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 2
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 2
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 1",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 4,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 2
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 2
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 2",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 4,
                            "UseFormContextForWorkflow": false
                           },
                           {
                            "Scope": {
                                "ObjectID": null,
                                "Type": 2
                            },
                            "ScopeRule": {
                                "ScopeAppliesTo": -3,
                                "ScopeDepth": null,
                                "ScopeDepthType": 2
                            },
                            "Link": {
                                "FormID": null,
                                "TabID": null,
                                "AttachmentID": null,
                                "URI": null,
                                "Type": 2
                            },
                            "EmbeddedWorkflow": null,
                            "Choice": null,
                            "FieldToUpdate": null,
                            "Manager": {
                                "ID": null,
                                "Type": 4
                            },
                            "Name": "Task 3",
                            "Description": "",
                            "SignOffType": 1,
                            "Type": 4,
                            "UseFormContextForWorkflow": false
                           }
                        ],
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": 12
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 2
                        },
                        "DirectPredecessorIDs": [
                           10
                        ]
                    },
                    "2": {
                        "ID": 2,
                        "Column": 530,
                        "Row": 106,
                        "Scope": {
                            "ObjectID": null,
                            "Type": 2
                        },
                        "Manager": {
                            "ID": null,
                            "Type": 4
                        },
                        "Name": "End",
                        "Description": "",
                        "Duration": {
                            "Amount": 0,
                            "Unit": 0
                        },
                        "Type": 6,
                        "ErrorHandlingType": 2,
                        "Tasks": null,
                        "Tracks": null,
                        "Transition": {
                            "Options": [
                               {
                                "IsDefaultOption": false,
                                "Label": "Option 1",
                                "TargetStepID": null
                               }
                            ],
                            "Rules": [],
                            "CategoryTransition": null,
                            "Type": 1
                        },
                        "DirectPredecessorIDs": [
                           25
                        ]
                    }
                },
                "StepsVisualProperties": {
                    "1": {
                        "Name": "Start",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "13": {
                        "Name": "Decision 1",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "14": {
                        "Name": "Decision 2",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "15": {
                        "Name": "Decision 3",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "16": {
                        "Name": "Decision 4",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "17": {
                        "Name": "Decision 5",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "18": {
                        "Name": "Decision 6",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "19": {
                        "Name": "Decision 7",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "20": {
                        "Name": "Decision 8",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "21": {
                        "Name": "Parallel Step 1",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "22": {
                        "Name": "Parallel Step 2",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "23": {
                        "Name": "Parallel Step 3",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "24": {
                        "Name": "Parallel Step 4",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "25": {
                        "Name": "Parallel Step 5",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "3": {
                        "Name": "Step 1",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "12": {
                        "Name": "Step 10",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "4": {
                        "Name": "Step 2",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "5": {
                        "Name": "Step 3",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "6": {
                        "Name": "Step 4",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "7": {
                        "Name": "Step 5",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "8": {
                        "Name": "Step 6",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "9": {
                        "Name": "Step 7",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "10": {
                        "Name": "Step 8",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "11": {
                        "Name": "Step 9",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "2": {
                        "Name": "End",
                        "LocationType": 2,
                        "ParentStepID": 0,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "27": {
                        "Name": "Step 11",
                        "LocationType": 1,
                        "ParentStepID": 25,
                        "TrackIndex": 0,
                        "InTrackIndex": 0
                    },
                    "30": {
                        "Name": "Step 12",
                        "LocationType": 1,
                        "ParentStepID": 25,
                        "TrackIndex": 1,
                        "InTrackIndex": 0
                    },
                    "31": {
                        "Name": "Step 13",
                        "LocationType": 1,
                        "ParentStepID": 25,
                        "TrackIndex": 1,
                        "InTrackIndex": 1
                    }
                }
            };
        }
    };
});