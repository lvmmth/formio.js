export default {
  form: `
{% if (!component.image) { %}
<ul class="list-group list-group-striped">
  <li class="list-group-item list-group-header hidden-xs hidden-sm">
    <div class="row">
      {% if (!disabled) { %}
      <div class="col-md-1"></div>
      {% } %}
      <div class="col-md-9"><strong>File Name</strong></div>
      <div class="col-md-2"><strong>Size</strong></div>
    </div>
  </li>
  {% files.forEach(function(file) { %}
  <li class="list-group-item">
    <div class="row">
      {% if (!disabled) { %}
      <div class="col-md-1"><i class="glyphicon glyphicon-remove" ref="removeLink"></i></div>
      {% } %}
      <div class="col-md-9"><a href="{{file.url}}" target="_blank" ref="fileLink">{{file.originalName || file.name}}</a></div>
      <div class="col-md-2">{{fileSize(file.size)}}</div>
    </div>
  </li>
  {% }) %}
</ul>
{% } else { %}
<div>
  {% files.forEach(function(file) { %}
  <div>
    <span>
      <img ref="fileImage" src="" alt="{{file.originalName || file.name}}" style="width:{{component.imageSize}}px" />
      {% if (!disabled) { %}
      <i class="glyphicon glyphicon-remove" ref="removeLink"></i>
      {% } %}
    </span>
  </div>
  {% }) %}
</div>
{% } %}
{% if (!disabled && (component.multiple || !files.length)) { %}
<input type="file" style="opacity: 0; position: absolute;" tabindex="-1" ref="hiddenFileInputElement">
<div class="fileSelector" ref="fileDrop">
  <i class="glyphicon glyphicon-cloud-upload"></i> Drop files to attach, or <a href="#" ref="fileBrowse" class="browse">browse</a>
</div>
{% } %}
{% statuses.forEach(function(status) { %}
<div class="file {{statuses.status === 'error' ? ' has-error' : ''}}">
  <div class="row">
    <div class="fileName control-label col-sm-10">{{status.originalName}} <i class="glyphicon glyphicon-remove" ref="fileStatusRemove"></i></div>
    <div class="fileSize control-label col-sm-2 text-right">{{fileSize(status.size)}}</div>
  </div>
  <div class="row">
    <div class="col-sm-12">
      {% if (status.status === 'progress') { %}
      <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow="{{status.progress}}" aria-valuemin="0" aria-valuemax="100" style="width: {{status.progress}}">
          <span class="sr-only">{{status.progress}}% Complete</span>
        </div>
      </div>
      {% } else { %}
      <div class="bg-{{status.status}}">{{status.message}}</div>
      {% } %}
    </div>
  </div>
</div>
{% }) %}
{% if (!component.storage || status.hasWarning) { %}
<div class="alert alert-warning">
  {% if (!component.storage) { %}
    <p>No storage has been set for this field. File uploads are disabled until storage is set up.</p>
  {% } %}
  {% if (!support.dnd) { %}
    <p>File Drag/Drop is not supported for this browser.</p>
  {% } %}
  {% if (!support.filereader) { %}
    <p>File API & FileReader API not supported.</p>
  {% } %}
  {% if (!support.formdata) { %}
    <p>XHR2's FormData is not supported.</p>
  {% } %}
  {% if (!support.progress) { %}
    <p>XHR2's upload progress isn't supported.</p>
  {% } %}
</div>
{% } %}
`,
};
