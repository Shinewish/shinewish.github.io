    
            // get the fs object based on Browser being used
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            navigator.persistentStorage = navigator.persistentStorage || navigator.webkitPersistentStorage;
            // Get the page elements to work with
            var maxFileSizeQuota = 1024 * 1024 * 5;
            var form = document.getElementById('form1');
            var fileNameTextBox = document.getElementById('txtFileName');
            var contentTextArea = document.getElementById('txtFileContent');
            var fileList = document.getElementById('listOfFiles');
            var messageBox = document.getElementById('lblMessages');


            // global variable to store the fs object
            var fs = null;

            // initialize the file System
            function initFileSystem() {
                navigator.persistentStorage.requestQuota(maxFileSizeQuota, function (grantedSize) {
                    window.requestFileSystem(window.PERSISTENT, grantedSize, function (fileSystem) {
                        fs = fileSystem;
                        console.log('111');
                        form.addEventListener('submit', function (e) {
                            e.preventDefault();

                            // save the file now
                            saveTheFile(fileNameTextBox.value, contentTextArea.value);
                        });

                        // List the file now
                        listFiles();

                    }, handleError);
                }, handleError);
            }



            // Save a file in the FileSystem.
            function saveTheFile(filename, content) {
                fs.root.getFile(filename, { create: true }, function (fileEntry) {

                    fileEntry.createWriter(function (fileWriter) {

                        fileWriter.onwriteend = function (e) {
                            // Update the file browser.
                            listFiles();

                            // Clean out the form field.
                            fileNameTextBox.value = '';
                            contentTextArea.value = '';

                            // Show message
                            messageBox.innerHTML = 'File saved successfully!';
                        };

                        fileWriter.onerror = function (e) {
                            alert('Error occured: ' + e.toString() + "\n File couldn't saved");
                        };

                        var contentBlob = new Blob([content], { type: 'text/plain' });

                        fileWriter.write(contentBlob);

                    }, handleError);

                }, handleError);
            }


            function listFiles() {
                var dirReader = fs.root.createReader();
                var entries = [];

                function fetchEntries() {
                    dirReader.readEntries(function (results) {
                        if (!results.length) {
                            displayEntries(entries.sort().reverse());
                        } else {
                            entries = entries.concat(results);
                            fetchEntries();
                        }
                    }, handleError);
                };

                fetchEntries();
            }

            function displayEntries(entries) {
                // Clear out the current file browser entries.
                fileList.innerHTML = '';

                entries.forEach(function (entry, i) {

                    // create edit button
                    var li = document.createElement('li');
                    var button = document.createElement('button');
                    button.innerHTML = 'Show content of <b>' + entry.fullPath + '</b> file';
                    li.appendChild(button);

                    // create delete link
                    var delLink = document.createElement('a');
                    delLink.innerHTML = ' <span style="color:red;cursor:pointer;">[x]</span>';
                    li.appendChild(delLink);

                    // append both of them
                    fileList.appendChild(li);

                    // add click event on the button
                    button.addEventListener('click', function (e) {
                        e.preventDefault();
                        loadTheFile(entry.name);
                    });

                    // add click even on the link
                    delLink.addEventListener('click', function (e) {
                        e.preventDefault();
                        deleteTheFile(entry.name);
                    });
                });
            }

            function loadTheFile(filename) {
                // 2nd parameter is whether to create the file or read the file, refer to deleteTheFile function
                fs.root.getFile(filename, {}, function (fileEntry) {

                    fileEntry.file(function (file) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            // Update the form fields.
                            fileNameTextBox.value = filename;
                            contentTextArea.value = this.result;
                        };

                        reader.readAsText(file);
                    }, handleError);

                }, handleError);
            }


            function deleteTheFile(filename) {
                fs.root.getFile(filename, { create: false }, function (fileEntry) {

                    fileEntry.remove(function (e) {
                        // Update the file list.
                        listFiles();

                        // Show delete message
                        messageBox.innerHTML = 'File deleted!';
                    }, handleError);

                }, handleError);
            }

            // Rename the file
            function RenameTheFile()
            {
                var renameTextBox = document.getElementById('txtRename');

                fs.root.getFile(fileNameTextBox.value, {}, function (fileEntry) {
                    fileEntry.moveTo(fs.root, renameTextBox.value);

                    listFiles(); // relist the files

                    alert("The file has been renamed successfully !.");

                }, handleError);
            }

            // Start the application
            if (window.requestFileSystem) {
                initFileSystem();
            } else {
                alert('Sorry! Your browser doesn\'t support the FileSystem API :(');
            }

            // Generic Error handler used in the FileSyste that is found on the web
            function handleError(error) {
                var message = '';

                switch (error.code) {
                    case FileError.SECURITY_ERR:
                        message = 'Security Error occured';
                        break;
                    case FileError.NOT_FOUND_ERR:
                        message = 'File Not Found';
                        break;
                    case FileError.QUOTA_EXCEEDED_ERR:
                        message = 'Quota limit Exceeded';
                        break;
                    case FileError.INVALID_MODIFICATION_ERR:
                        message = "Can''t modify";
                        break;
                    case FileError.INVALID_STATE_ERR:
                        message = 'Invalid State';
                        break;
                    default:
                        message = 'Do not know, what happened. Report to webmaster';
                        break;
                }
                alert(message);
            }
        

