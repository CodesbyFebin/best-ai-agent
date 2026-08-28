#!/bin/bash
# Generate P01 disposition manifest from authoritative CSV

CSV_FILE="data/bestaiagent-50-pillar-inventory.csv"
OUTPUT_FILE="reports/p01-disposition-manifest.csv"

# Write header
echo "pillar_id,topic_index,source_slug,source_title,intent_group,disposition,canonical_target,reason,source_line" > "$OUTPUT_FILE"

# Process P01 records (pillar_id = p01)
LINE_NUM=2
while IFS=',' read -r group pillar_id pillar_name pillar_url topic_index topic_slug full_url suggested_title page_class priority changefreq lastmod; do
  # Skip header
  if [[ "$group" == "group" && "$pillar_id" == "pillar_id" ]]; then
    continue
  fi
  
  # Only process P01 records
  if [[ "$pillar_id" == "p01" ]]; then
    # Determine intent group based on topic_index
    if [[ $topic_index -eq 0 ]]; then
      intent_group="pillar"
    elif [[ $topic_index -ge 1 && $topic_index -le 12 ]]; then
      intent_group="persona"
    elif [[ $topic_index -ge 13 && $topic_index -le 32 ]]; then
      intent_group="workflow"
    elif [[ $topic_index -ge 33 && $topic_index -le 40 ]]; then
      intent_group="generated-question"
    elif [[ $topic_index -ge 41 && $topic_index -le 50 ]]; then
      intent_group="industry"
    else
      intent_group="unknown"
    fi
    
    # Determine disposition based on our classification system
    # We'll use the classifications from p01-classification.ts
    case $topic_index in
      0)  # Pillar
        disposition="build_now"
        reason="AI Agents Core & Definitions"
        canonical_target="/ai-agents"
        ;;
      1)  # ai-agents-for-startups
        disposition="build_now"
        reason="Distinct persona with evidence-backed vendor pricing already in ledger."
        canonical_target="/ai-agents-for-startups"
        ;;
      2)  # ai-agents-for-small-business
        disposition="needs_more_research"
        reason="Persona-specific evidence required; deferred to persona wave."
        canonical_target="/ai-agents-for-small-business"
        ;;
      3)  # ai-agents-for-enterprises
        disposition="needs_more_research"
        reason="Persona-specific evidence required; deferred to persona wave."
        canonical_target="/ai-agents-for-enterprises"
        ;;
      4)  # ai-agents-for-solopreneurs
        disposition="needs_more_research"
        reason="Persona-specific evidence required; deferred to persona wave."
        canonical_target="/ai-agents-for-solopreneurs"
        ;;
      5)  # ai-agents-for-freelancers
        disposition="needs_more_research"
        reason="Persona-specific evidence required; deferred to persona wave."
        canonical_target="/ai-agents-for-freelancers"
        ;;
      6)  # ai-agents-for-students
        disposition="needs_more_research"
        reason="Persona-specific evidence required; deferred to persona wave."
        canonical_target="/ai-agents-for-students"
        ;;
      7)  # ai-agents-for-developers
        disposition="needs_more_research"
        reason="Persona-specific evidence required; deferred to persona wave."
        canonical_target="/ai-agents-for-developers"
        ;;
      8)  # ai-agents-for-agencies
        disposition="needs_more_research"
        reason="Persona-specific evidence required; deferred to persona wave."
        canonical_target="/ai-agents-for-agencies"
        ;;
      9)  # ai-agents-for-consultants
        disposition="needs_more_research"
        reason="Persona-specific evidence required; deferred to persona wave."
        canonical_target="/ai-agents-for-consultants"
        ;;
      10) # ai-agents-for-nonprofits
        disposition="needs_more_research"
        reason="Persona-specific evidence required; deferred to persona wave."
        canonical_target="/ai-agents-for-nonprofits"
        ;;
      11) # ai-agents-for-ctos
        disposition="needs_more_research"
        reason="Persona-specific evidence required; deferred to persona wave."
        canonical_target="/ai-agents-for-ctos"
        ;;
      12) # ai-agents-for-founders
        disposition="merge_redirect"
        reason="Intent overlaps with topic_index 1 (ai-agents-for-startups); merge."
        canonical_target="/ai-agents-for-startups"
        ;;
      13) # ai-agents-automation
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-automation"
        ;;
      14) # ai-agents-workflow
        disposition="merge_redirect"
        reason="Duplicates /agentic-workflows; merge into the canonical sibling."
        canonical_target="/agentic-workflows"
        ;;
      15) # ai-agents-lead-generation
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-lead-generation"
        ;;
      16) # ai-agents-data-analysis
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-data-analysis"
        ;;
      17) # ai-agents-reporting
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-reporting"
        ;;
      18) # ai-agents-scheduling
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-scheduling"
        ;;
      19) # ai-agents-onboarding
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-onboarding"
        ;;
      20) # ai-agents-forecasting
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-forecasting"
        ;;
      21) # ai-agents-compliance
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-compliance"
        ;;
      22) # ai-agents-research
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-research"
        ;;
      23) # ai-agents-content-creation
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-content-creation"
        ;;
      24) # ai-agents-translation
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-translation"
        ;;
      25) # ai-agents-fraud-detection
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-fraud-detection"
        ;;
      26) # ai-agents-risk-management
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-risk-management"
        ;;
      27) # ai-agents-personalization
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-personalization"
        ;;
      28) # ai-agents-documentation
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-documentation"
        ;;
      29) # ai-agents-invoicing
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-invoicing"
        ;;
      30) # ai-agents-ticketing
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-ticketing"
        ;;
      31) # ai-agents-auditing
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-auditing"
        ;;
      32) # ai-agents-monitoring
        disposition="needs_more_research"
        reason="Workflow-specific evidence required; deferred to workflow wave."
        canonical_target="/ai-agents-monitoring"
        ;;
      33) # what-is-an-ai-agent-ai-agents
        disposition="merge_redirect"
        reason="Generated question slug; merge into /ai-agents or relevant section."
        canonical_target="/ai-agents"
        ;;
      34) # how-does-an-ai-agent-ai-agents
        disposition="merge_redirect"
        reason="Generated question slug; merge into /ai-agents or relevant section."
        canonical_target="/ai-agents"
        ;;
      35) # why-use-an-ai-agent-ai-agents
        disposition="merge_redirect"
        reason="Generated question slug; merge into /ai-agents or relevant section."
        canonical_target="/ai-agents"
        ;;
      36) # is-an-ai-agent-ai-agents
        disposition="merge_redirect"
        reason="Generated question slug; merge into /ai-agents or relevant section."
        canonical_target="/ai-agents"
        ;;
      37) # can-an-ai-agent-ai-agents
        disposition="merge_redirect"
        reason="Generated question slug; merge into /ai-agents or relevant section."
        canonical_target="/ai-agents"
        ;;
      38) # should-you-use-an-ai-agent-ai-agents
        disposition="merge_redirect"
        reason="Generated question slug; merge into /ai-agents or relevant section."
        canonical_target="/ai-agents-vs-chatbots"
        ;;
      39) # how-to-choose-an-ai-agent-ai-agents
        disposition="merge_redirect"
        reason="Generated question slug; merge into /ai-agents or relevant section."
        canonical_target="/ai-agent-evaluation"
        ;;
      40) # how-secure-is-an-ai-agent-ai-agents
        disposition="merge_redirect"
        reason="Generated question slug; merge into /ai-agents or relevant section."
        canonical_target="/ai-agent-evaluation"
        ;;
      41) # ai-agents-examples-in-healthcare
        disposition="retarget"
        reason="Industry intent; retarget to corresponding industry pillar when built."
        canonical_target="/tbd/tbd"
        ;;
      42) # ai-agents-examples-in-real-estate
        disposition="retarget"
        reason="Industry intent; retarget to corresponding industry pillar when built."
        canonical_target="/tbd/tbd"
        ;;
      43) # ai-agents-examples-in-banking
        disposition="retarget"
        reason="Industry intent; retarget to corresponding industry pillar when built."
        canonical_target="/tbd/tbd"
        ;;
      44) # ai-agents-examples-in-education
        disposition="retarget"
        reason="Industry intent; retarget to corresponding industry pillar when built."
        canonical_target="/tbd/tbd"
        ;;
      45) # ai-agents-examples-in-retail
        disposition="retarget"
        reason="Industry intent; retarget to corresponding industry pillar when built."
        canonical_target="/tbd/tbd"
        ;;
      46) # ai-agents-examples-in-insurance
        disposition="retarget"
        reason="Industry intent; retarget to corresponding industry pillar when built."
        canonical_target="/tbd/tbd"
        ;;
      47) # ai-agents-examples-in-manufacturing
        disposition="retarget"
        reason="Industry intent; retarget to corresponding industry pillar when built."
        canonical_target="/tbd/tbd"
        ;;
      48) # ai-agents-examples-in-travel
        disposition="retarget"
        reason="Industry intent; retarget to corresponding industry pillar when built."
        canonical_target="/tbd/tbd"
        ;;
      49) # ai-agents-examples-in-legal
        disposition="retarget"
        reason="Industry intent; retarget to corresponding industry pillar when built."
        canonical_target="/tbd/tbd"
        ;;
      50) # ai-agents-examples-in-logistics
        disposition="retarget"
        reason="Industry intent; retarget to corresponding industry pillar when built."
        canonical_target="/tbd/tbd"
        ;;
      *)
        disposition="needs_more_research"
        reason="Default disposition for unmapped topic_index"
        canonical_target="/$topic_slug"
        ;;
    esac
    
    # Escape quotes in title for CSV
    escaped_title=$(echo "$suggested_title" | sed 's/"/""/g')
    escaped_reason=$(echo "$reason" | sed 's/"/""/g')
    
    # Write row
    echo "$pillar_id,$topic_index,$topic_slug,\"$escaped_title\",$intent_group,$disposition,$canonical_target,\"$escaped_reason\",$LINE_NUM" >> "$OUTPUT_FILE"
  fi
  
  ((LINE_NUM++))
done < "$CSV_FILE"

echo "Manifest generated: $OUTPUT_FILE"
